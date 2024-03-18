import { Body, Controller, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto, SendMailRecoveryPasswordDto } from './dto';

// Services
import { AuthService } from './auth.service';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(
        @Body() loginUserDto: LoginUserDto,
    ) {
        return this.authService.login(loginUserDto);
    }

    @Patch('recovery-password')
    @UsePipes(ValidationPipe)
    recoveryPassword(
        @Body() recoveryPasswordDto: RecoveryPasswordDto,
    ) {
        return this.authService.recoveryPassword(recoveryPasswordDto);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    register(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.authService.register(createUserDto);
    }

    @Post('send-recovery-password')
    @UsePipes(ValidationPipe)
    sendMailForRecoveryPassword(
        @Body() sendMailRecoveryPasswordDto: SendMailRecoveryPasswordDto,
    ) {
        return this.authService.sendMailForRecoveryPassword(sendMailRecoveryPasswordDto);
    }

}
