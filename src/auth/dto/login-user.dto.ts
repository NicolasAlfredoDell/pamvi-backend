import { IsDefined, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

    @IsDefined({ message: 'Debe enviar un correo.' })
    @IsEmail({}, { message: 'Ingrese un correo válido.' })
    @IsNotEmpty({ message: 'Debe ingresar un correo.' })
    @IsString({ message: 'El correo debe estar compuesto de caracteres.' })
    email: string;

    @IsDefined({ message: 'Debe enviar una contraseña.' })
    @IsNotEmpty({ message: 'Debe ingresar una contraseña.' })
    @IsString({ message: 'La contraseña debe estar compuesta de caracteres.' })
    @MinLength(6, { message: 'La contraseña debe tener 6 omás caracteres.' })
    @MaxLength(50, { message: 'La contraseña debe tener 50 o menos caracteres.' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número.'
    })
    password: string;

}