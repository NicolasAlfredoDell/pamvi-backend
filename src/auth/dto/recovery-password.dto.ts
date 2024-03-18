import { IsDefined, IsNotEmpty, IsString, Matches, MaxLength, MinLength, } from 'class-validator';

export class RecoveryPasswordDto {

    @IsString({ message: 'La contrseña debe ser una cadena de caracteres' })
    @MinLength(6, { message: 'La contrseña debe tener 6 o más caracteres' })
    @MaxLength(50, { message: 'La contrseña debe tener 50 o menos caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsDefined({ message: 'La confirmación de la contrseña debe estar definida' })
    @IsNotEmpty({ message: 'La confirmación no puede estar vacía' })
    @IsString({ message: 'La confirmación de la contrseña debe ser una cadena de caracteres' })
    passwordConfirm: string;

}