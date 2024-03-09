import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './entities/login-user.dto';

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

        private readonly configService: ConfigService,
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
            throw new UnauthorizedException('Usuario y/o contraseña incorrectas');

        return {
            message: 'Logueado correctamente.',
            token: this.getJWT({ id: user.id, email: user.email, }),
        };
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const { password, ...userDetail } = createUserDto;
            
            const user = this.authRepository.create({
                ...userDetail,
                password: bcrypt.hashSync(password, 10)
            });

            await this.authRepository.save( user );
            delete user.password;

            return {
                ...user,
                token: this.getJWT({ id: user.id, email: user.email })
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
        if (error.code === '23505')
            throw new BadRequestException(error.detail);
        
        this.logger.error(error);
        throw new InternalServerErrorException(`Error inesperado, verifique los logs`);
    }

}
