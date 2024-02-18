import { Body, Controller, Param, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';

// DTOs
import { AuthDto } from './dto/auth.dto';

// Services
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post(':id')
    login(
        @Body() authDto: AuthDto,
        @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string,
    ) {
        this.authService.findOneById(id, authDto);
    }

    @Post()
    recoveryPassword() {
        
    }

    @Post()
    register() {
        
    }

}
