import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

// UUID
import { v4 as uuid } from 'uuid';

// Dtos
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

// Interfaces
import { Auth } from './entities/auth.entity';

// TypeORM
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly configService: ConfigService,
    ) {}

    async create(createAuthDto: CreateAuthDto) {
        try {
            const auth = this.authRepository.create(createAuthDto);
            await this.authRepository.save( auth );
            return auth;
        } catch (error) { this.handleDBException(error) }
    }

    private handleDBException(error: any) {
        if (error.code === '23505') throw new BadRequestException(error.detail);
        this.logger.error(error);
        throw new InternalServerErrorException(`Unexpected errors, check server logs`);
    }

}
