import { Body, Controller, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// Services
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post(':id')
    login(
        @Body() createUserDto: CreateUserDto,
        @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string,
    ) {
        
    }

    @Patch()
    recoveryPassword() {
        
    }

    @Post()
    register( @Body() createUserDto: CreateUserDto ) {
        return this.authService.create(createUserDto);
    }

    @Post()
    sendMailForRecoveryPassword() {
        
    }

}
