import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

// Dtos
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './entities/login-user.entity';

// Entities
import { User } from 'src/users/entities/user.entity';

// TypeORM
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true },
        });

        if ( !user || !bcrypt.compareSync(password, user.password) )
            throw new UnauthorizedException('Usuario y/o contraseña incorrectas');

        return user;
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

            return user;
        } catch (error) { this.handleDBException(error) }
    }

    private handleDBException(error: any): never {
        if (error.code === '23505') throw new BadRequestException(error.detail);
        this.logger.error(error);
        throw new InternalServerErrorException(`Unexpected errors, check server logs`);
    }

}
