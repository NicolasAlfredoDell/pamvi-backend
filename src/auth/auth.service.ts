import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateMailDto } from '../mails/dto/create-mail.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DestinationFilesDto } from 'src/files/dto/destination-files.dto';
import { LoginUserDto, RecoveryPasswordDto, SendMailRecoveryPasswordDto } from './dto';

// Entities
import { User } from 'src/users/entities/user.entity';

// interfaces
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

// Services
import { FilesService } from '../files/files.service';
import { GenderOfUsersService } from '../gender-of-users/gender-of-users.service';
import { MailsService } from '../mails/mails.service';
import { TokensValidationService } from '../tokens-validation/tokens-validation.service';
import { TypesOfUsersService } from '../types-of-users/types-of-users.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly filesService: FilesService,

        private readonly genderOfUsersService: GenderOfUsersService,

        private readonly jwtService: JwtService,

        private readonly mailsService: MailsService,

        private readonly typesOfUsersService: TypesOfUsersService,

        private tokensValidationService: TokensValidationService,

        private usersService: UsersService,
    ) {}

    async activeUser(
        token: any,
    ) {
        const { exp, id } = await this.jwtService.decode(token);

        if ( exp < Date.now() / 1000 )
            throw new UnauthorizedException(`Debe volver a solicitar el correo para la activación de su cuenta.`);
        
        try {
            await this.usersService.enabled(id);

            return {
                message: `Cuenta activada`,
            };
        } catch (error) { this.handleDBException(error) }
    }

    async login(
        loginUserDto: LoginUserDto,
    ) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, disabled: true, id: true },
        });

        if ( user.disabled )
            throw new UnauthorizedException('Cuenta deshabilitada.');

        if ( !user || !bcrypt.compareSync( password, user.password ) )
            throw new UnauthorizedException('Usuario y/o contraseña incorrectas.');

        return {
            message: 'Logueado correctamente.',
            token: this.getJWT({ id: user.id, email: user.email, }),
        };
    }

    async recoveryPassword(
        recoveryPasswordDto: RecoveryPasswordDto,
        token: string,
    ) {
        const { email, exp } = await this.jwtService.decode(token);

        if ( exp < Date.now() / 1000 )
            throw new UnauthorizedException(`Debe volver a solicitar el correo para la activación de su cuenta.`);

        const { password, passwordConfirm } = recoveryPasswordDto;

        if ( password !== passwordConfirm )
            throw new BadRequestException(`Las contraseñas no coinciden.`);

        const user = await this.userRepository.findOne({
            where: { email },
            select: { disabled: true, email: true, password: true, id: true },
        });

        if ( !user )
            throw new NotFoundException(`No existe el usuario.`);

        if ( user.disabled )
            throw new UnauthorizedException(`El usuario se encuentra deshabilitado.`);

        const tokenValidation = await this.tokensValidationService.findOne(token);

        if ( !tokenValidation )
            throw new NotFoundException(`Debe volver a solicitar el correo para la activación de su cuenta.`);

        try {
            await this.tokensValidationService.remove(tokenValidation.id);

            return {
                message: `Contraseña modificada correctamente.`,
            };
        } catch (error) { this.handleDBException(error) }
    }

    async register(
        avatar: Express.Multer.File,
        createUserDto: CreateUserDto,
    ) {
        const { gender, password, passwordConfirm, typeOfUser, ...userDetails } = createUserDto;
        
        if ( password !== passwordConfirm )
            throw new BadRequestException(`Las contraseñas no son iguales.`);

        let userDB = await this.usersService.findOne( userDetails.email );
        if ( userDB )
            throw new BadRequestException(`El correo ya se encuentra registrado.`);

        userDB = await this.usersService.findOne( userDetails.dni );
        if ( userDB )
            throw new BadRequestException(`El dni ya se encuentra registrado.`);

        const genderDB = await this.genderOfUsersService.findOne(gender);
    
        if ( genderDB.disabled )
            throw new BadRequestException(`El género está deshabilitado.`);

        const typeOfUserDB = await this.typesOfUsersService.findOne(typeOfUser);
    
        if ( typeOfUserDB.disabled )
            throw new BadRequestException(`El tipo de usuario está deshabilitado.`);

        let fileNameAvatar = null;
        if ( avatar ) {
            const destinationFilesDto: DestinationFilesDto = {
                destination: 'users',
                filesStorageRemove: null,
            };
            const imagesData = await this.filesService.uploadFiles( destinationFilesDto, [avatar] );
            fileNameAvatar = imagesData.filesName[0];
        }

        try {
            const user = this.authRepository.create({
                ...userDetails,
                avatar: fileNameAvatar ? fileNameAvatar : null,
                gender: genderDB,
                password: bcrypt.hashSync(password, 10),
                typeOfUser: typeOfUserDB,
            });

            await this.authRepository.save( user );

            this.sendMailRegister( user );

            return {
                message: `Usuario registrado correctamente. Le hemos enviado un correo a ${user.email} para activar su cuenta.`,
            };
        } catch (error) { this.handleDBException(error) }
    }

    async sendMailRegister(
        user: any,
    ) {
        if ( !user.id )
            user = await this.usersService.findOne( user.email );

        try {
            const createMailDto: CreateMailDto = {
                context: { token: this.getJWT({ id: user.id, email: user.email, }) },
                subject: 'Activación de cuenta en PAMVI',
                template: 'register',
                to: [user.email],
            };
    
            await this.mailsService.sendMail(createMailDto);

            return {
                message: `Le hemos enviado un correo a ${user.email} para activar su cuenta.`,
            }
        } catch (error) { this.handleDBException(error) }
    }

    async sendMailForRecoveryPassword(
        sendMailRecoveryPasswordDto: SendMailRecoveryPasswordDto,
    ) {
        const { email } = sendMailRecoveryPasswordDto;

        try {
            const user = await this.userRepository.findOne({
                where: { email },
                select: { email: true, password: true, id: true },
            });

            if ( !user )
                throw new NotFoundException(`El correo no está registrado en el sistema.`);

            const token = await this.getJWT({ id: user.id, email: user.email, });
            
            await this.tokensValidationService.create({token});
            
            const createMailDto: CreateMailDto = {
                context: { token },
                subject: 'Recuperación de contraseña',
                template: 'recovery-password',
                to: [user.email],
            };

            await this.mailsService.sendMail(createMailDto);

            return {
                message: `Correo enviado a ${email}`,
            };
        } catch (error) { this.handleDBException(error) }
    }

    private getJWT(
        payload: JwtPayload,
    ): string {
        return this.jwtService.sign(payload);
    }

    private handleDBException(
        error: any,
    ): never {
        if ( error.code === '23505' ) {
            if ( error.detail.includes('Key (dni)') )
                throw new BadRequestException(`El dni ya se encuentra registrado.`);

            if ( error.detail.includes('Key (email)') )
                throw new BadRequestException(`El correo ya se encuentra registrado.`);

            throw new BadRequestException(error.detail);
        }
        
        this.logger.error(error);
        throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
    }

}
