import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto, RecoveryPasswordDto, SendMailRecoveryPasswordDto } from './dto';

// Entities
import { User } from 'src/users/entities/user.entity';

// interfaces
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    async login(
        loginUserDto: LoginUserDto,
    ) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, id: true },
        });

        if ( !user || !bcrypt.compareSync( password, user.password ) )
            throw new UnauthorizedException('Usuario y/o contraseña incorrectas.');

        return {
            message: 'Logueado correctamente.',
            token: this.getJWT({ id: user.id, email: user.email, }),
        };
    }

    async recoveryPassword(
        recoveryPasswordDto: RecoveryPasswordDto,
    ) {
        const { password, passwordConfirm } = recoveryPasswordDto;

        if ( password !== passwordConfirm )
            throw new BadRequestException(`Las contraseñas no coinciden.`);

        try {
            // VERIFICAR QUE EXISTE EL TOKEN
            // SI NO EXISTE O ESTA VENCIDO, MENSAJE DE ERROR
            // SI EXISTE ELIMINAR TOKEN DE LA BD Y CAMBIAR LA CONTRASENA AL USUARIO

            // const user = await this.userRepository.findOne({
            //     where: { email },
            //     select: { email: true, password: true, id: true },
            // });

            // if ( !user )
            //     throw new NotFoundException(`No existe el usuario.`);

            return {
                message: `Contraseña modificada correctamente.`,
            };
        } catch (error) { this.handleDBException(error) }
    }

    async register(
        createUserDto: CreateUserDto,
    ) {
        const { password, passwordConfirm, ...userDetails } = createUserDto;

        if ( password !== passwordConfirm )
            throw new BadRequestException(`Las contraseñas no son iguales.`);

        try {
            const user = this.authRepository.create({
                ...userDetails,
                password: bcrypt.hashSync(password, 10)
            });

            await this.authRepository.save( user );

            return {
                message: 'Usuario registrado correctamente. Le hemos enviado un correo para activar su cuenta.',
            };
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
                throw new NotFoundException(`No existe el correo.`);

            // GENERAR UN TOKEN CON VALIDACION DE 1 HORA
            // PONER UNA RESOURCE PARA GUARDAR LOS TOKENS
            // CREAR TEMPLATE PARA EL MAIL
            // ENVIAR EMAIL 

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
