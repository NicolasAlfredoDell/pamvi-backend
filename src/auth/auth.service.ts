import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// UUID
import { v4 as uuid } from 'uuid';

// Dtos
import { AuthDto } from './dto/auth.dto';

// Interfaces
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly configService: ConfigService,
    ) {}

    users: Auth[] = [
        {
            id: uuid(),
            lastname: 'dell',
            name: 'nick',
        }
    ];

    findOneById( id: string, authDto: AuthDto ) {
        console.log( this.configService.get<number>('defaultLimit') );

        const user = this.users.find( user => user.id === id );

        if ( !user ) throw new NotFoundException(`Usuario con el id ${id} no existe.`);

        return user;
    }

}
