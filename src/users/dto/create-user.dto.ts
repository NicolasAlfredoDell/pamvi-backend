import { IsBoolean, IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional,
    IsPositive, IsString, IsUrl, Matches, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @IsString({ message: 'El DNI debe ser alfanumérico' })
    @Matches(/^[0-9]$/, { message: 'El DNI debe tener valores numéricos' })
    @MaxLength(8, { message: 'El DNI debe tener hasta 8 dígitos' })
    @MinLength(7, { message: 'El DNI debe tener 7 dígitos o más' })
    dni: string;

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una cadena de caracteres válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @MinDate(new Date(), { message: 'La fecha debe ser igual o posterior a la fecha actual' })
    birthday: Date;

    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    @IsEmail()
    email: string;

    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsOptional()
    @IsUrl()
    instagram?: string;

    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    lastname: string;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    name: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsUrl()
    twitter?: string;

    @IsInt()
    @IsNotEmpty({ message: 'La edad no puede estar vacío' })
    @IsPositive()
    years: number;

    @IsBoolean()
    @IsNotEmpty({ message: 'El estado de deshabilitado no puede estar vacío' })
    disabled: boolean;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de creación no puede estar vacío' })
    created_at: Date;

    @IsDateString()
    @IsOptional()
    updated_at: Date;

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION

}
