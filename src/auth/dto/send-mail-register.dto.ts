import { IsDefined, IsEmail, IsNotEmpty, IsString, } from 'class-validator';

export class SendMailRegisterDto {

    @IsDefined({ message: 'Debe enviar el correo.' })
    @IsEmail({}, { message: 'Ingrese un correo válido' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
    @IsString({ message: 'El correo debe estar compuesto de caracteres.' })
    email: string;

}