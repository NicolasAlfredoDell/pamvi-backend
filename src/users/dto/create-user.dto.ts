import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString,
    IsUUID, IsUrl, Matches, MaxDate, MaxLength, MinDate, MinLength } from 'class-validator';

export class CreateUserDto {

     // FALTA LOCACION

    @IsDefined({ message: 'La fecha de nacimiento debe estar definida' })
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @MaxDate(new Date('2006-01-01'), { message: 'La fecha debe ser igual o anterior al año 2006' })
    @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    @Type( () => Date )
    birthday: Date;

    @IsDefined({ message: 'El DNI debe estar definido' })
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @IsString({ message: 'El DNI debe ser una cadena de caracteres' })
    @Matches(/^[0-9]+$/, { message: 'El DNI solo acepta valores numéricos' })
    @MaxLength(8, { message: 'El DNI debe tener hasta 8 dígitos o menos' })
    @MinLength(7, { message: 'El DNI debe tener 7 dígitos o más' })
    dni: string;

    @IsDefined({ message: 'El correo debe estar definido' })
    @IsEmail({}, { message: 'Ingrese un correo válido' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    email: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    facebook?: string;

    @IsDefined({ message: 'El género debe estar definido' })
    @IsUUID('4', { message: 'El género debe ser un UUID' })
    @IsNotEmpty({ message: 'El género no puede estar vacío' })
    gender: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    instagram?: string;

    @IsBoolean({ message: 'Debe ser verdadero o falso' })
    @IsDefined({ message: 'Debe enviar si es veterinario/a' })
    @IsNotEmpty({ message: 'Si es veterinario o no, no puede estar vacío' })
    @Type( () => Boolean )
    isVeterinarian: boolean;

    @IsDefined({ message: 'El o los apellidos deben estar definidos' })
    @IsNotEmpty({ message: 'El o los apellidos no pueden estar vacíos' })
    @IsString({ message: 'El o los apellidos deben ser una cadena de caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$/, { message: 'El o los apellidos deben tener solo letras' })
    lastnames: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    mercadopago?: string;

    @IsDefined({ message: 'El o los nombres deben estar definidos' })
    @IsNotEmpty({ message: 'El o los nombres no pueden estar vacíos' })
    @IsString({ message: 'El o los nombres deben tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El o los nombres deben tener solo letras' })
    names: string;

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

    @IsDefined({ message: 'El tipo de usuario debe estar definido' })
    @IsUUID('4', { message: 'El tipo de usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El tipo de usuario no puede estar vacío' })
    typeOfUser: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    twitter?: string;

}
