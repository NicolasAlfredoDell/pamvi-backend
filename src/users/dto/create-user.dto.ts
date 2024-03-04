import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsOptional,
    IsPositive, IsString, IsUrl, Matches, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateUserDto {

    @IsDefined({ message: 'El DNI debe estar definido' })
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @IsString({ message: 'El DNI debe ser alfanumérico' })
    @Matches(/^[0-9]$/, { message: 'El DNI debe tener valores numéricos' })
    @MaxLength(8, { message: 'El DNI debe tener hasta 8 dígitos' })
    @MinLength(7, { message: 'El DNI debe tener 7 dígitos o más' })
    dni: string;

    @IsDefined({ message: 'La fecha de nacimiento debe estar definida' })
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una cadena de caracteres válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @MinDate(new Date(), { message: 'La fecha debe ser igual o posterior a la fecha actual' })
    birthday: Date;

    @IsDefined({ message: 'El correo debe estar definido' })
    @IsEmail()
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    email: string;

    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsOptional()
    @IsUrl()
    instagram?: string;

    @IsDefined({ message: 'El apellido debe estar definido' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    lastname: string;

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    name: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseñan debe tener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsUrl()
    twitter?: string;

    @IsDefined({ message: 'La edad debe estar definida' })
    @IsInt()
    @IsNotEmpty({ message: 'La edad no puede estar vacío' })
    @IsPositive()
    years: number;

    @IsDefined({ message: 'El estado debe estar definido' })
    @IsBoolean()
    @IsNotEmpty({ message: 'El estado de deshabilitado no puede estar vacío' })
    disabled: boolean;

    @IsDefined({ message: 'La fecha de cración debe estar definida' })
    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de creación no puede estar vacío' })
    created_at: Date;

    @IsDefined({ message: 'La feche de modificación debe estar definida' })
    @IsDateString()
    @IsOptional()
    updated_at?: Date;

    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION

}
