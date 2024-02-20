import { IsBoolean, IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional,
    IsPositive, IsString, IsUrl, Matches, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateAuthDto {

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

    @IsEmail()
    email: string;

    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsOptional()
    @IsUrl()
    instagram?: string;

    @IsString()
    lastname: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsUrl()
    twitter?: string;

    @IsInt()
    @IsPositive()
    years: number;

    @IsBoolean()
    disabled: boolean;

    @IsDateString()
    created_at: Date;

    @IsDateString()
    updated_at: Date;

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION 

}