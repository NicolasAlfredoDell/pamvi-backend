import { IsDefined, IsEmail, IsNotEmpty, IsString, } from 'class-validator';

export class LoginUserDto {

    @IsDefined({ message: 'Debe enviar el correo.' })
    @IsEmail({}, { message: 'Ingrese un correo válido' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
    @IsString({ message: 'El correo debe estar compuesto de caracteres.' })
    email: string;

    @IsDefined({ message: 'Debe enviar la contraseña.' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe estar compuesta de caracteres.' })
    password: string;

}