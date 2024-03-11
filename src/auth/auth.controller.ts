import { Body, Controller, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

// Services
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post()
    login(
        @Body() loginUserDto: LoginUserDto,
    ) {
        return this.authService.login(loginUserDto);
    }

    @Patch()
    recoveryPassword() {
        
    }

    @Post('register')
    register(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.authService.register(createUserDto);
    }

    @Post()
    sendMailForRecoveryPassword() {
        
    }

}
