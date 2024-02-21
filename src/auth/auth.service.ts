import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const user = this.authRepository.create(createUserDto);
            await this.authRepository.save( user );
            return user;
        } catch (error) { this.handleDBException(error) }
    }

    private handleDBException(error: any) {
        if (error.code === '23505') throw new BadRequestException(error.detail);
        this.logger.error(error);
        throw new InternalServerErrorException(`Unexpected errors, check server logs`);
    }

}
