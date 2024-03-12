import { IsDefined, IsNotEmpty, IsString, } from 'class-validator';

export class LoginUserDto {

    @IsDefined({ message: 'El correo debe estar definido.' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
    @IsString({ message: 'El correo debe estar compuesto de caracteres.' })
    email: string;

    @IsDefined({ message: 'La contraseña debe estar definida.' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe estar compuesta de caracteres.' })
    password: string;

}