import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { User } from 'src/users/entities';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate( payload: JwtPayload ): Promise<User> {
        const { email } = payload;

        const user = await this.userRepository.findOneBy({email});

        if ( !user ) throw new UnauthorizedException('Token no válido');
        if ( user.disabled ) throw new UnauthorizedException('Usuario inhabilitado');

        return user;
    }

}