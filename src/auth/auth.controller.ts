import { Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto, SendMailRecoveryPasswordDto, SendMailRegisterDto } from './dto';

// Services
import { AuthService } from './auth.service';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Patch('active-user/:token')
    activeUser(
        @Param('token') token: string,
    ) {
        return this.authService.activeUser(token);
    }

    @Patch('recovery-password/:token')
    @UsePipes(ValidationPipe)
    recoveryPassword(
        @Body() recoveryPasswordDto: RecoveryPasswordDto,
        @Param('token') token: string,
    ) {
        return this.authService.recoveryPassword(recoveryPasswordDto, token);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(
        @Body() loginUserDto: LoginUserDto,
    ) {
        return this.authService.login(loginUserDto);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    @UseInterceptors(
        FileInterceptor('avatar'),
    )
    register(
        @UploadedFile() avatar: Express.Multer.File,
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.authService.register(avatar, createUserDto);
    }

    @Post('send-mail-register')
    @UsePipes(ValidationPipe)
    sendMailRegister(
        @Body() sendMailRegisterDto: SendMailRegisterDto,
    ) {
        return this.authService.sendMailRegister(sendMailRegisterDto);
    }

    @Post('send-mail-recovery-password')
    @UsePipes(ValidationPipe)
    sendMailForRecoveryPassword(
        @Body() sendMailRecoveryPasswordDto: SendMailRecoveryPasswordDto,
    ) {
        return this.authService.sendMailForRecoveryPassword(sendMailRecoveryPasswordDto);
    }

}
