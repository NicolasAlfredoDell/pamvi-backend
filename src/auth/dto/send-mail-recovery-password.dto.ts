import { IsDefined, IsNotEmpty, IsString, } from 'class-validator';

export class SendMailRecoveryPasswordDto {

    @IsDefined({ message: 'Debe enviar el correo.' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
    @IsString({ message: 'El correo debe estar compuesto de caracteres.' })
    email: string;

}