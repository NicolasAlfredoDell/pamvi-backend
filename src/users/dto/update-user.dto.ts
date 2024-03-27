import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl,
    Matches, MaxDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @IsOptional()
    @MaxDate(new Date('2006-01-01'), { message: 'La fecha debe ser igual o anterior al año 2006' })
    @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    @Type( () => Date )
    birthday?: Date;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    facebook?: string;

    @IsDefined({ message: 'El género debe estar definido' })
    @IsUUID('4', { message: 'El género debe ser un UUID' })
    @IsNotEmpty({ message: 'El género no puede estar vacío' })
    gender: string;

    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    instagram?: string;

    @IsNotEmpty({ message: 'El o los apellidos no pueden estar vacíos' })
    @IsOptional()
    @IsString({ message: 'El o los apellidos deben ser una cadena de caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$/, { message: 'El o los apellidos deben tener solo letras' })
    lastnames?: string;

    @IsNotEmpty({ message: 'El o los nombres no pueden estar vacíos' })
    @IsOptional()
    @IsString({ message: 'El o los nombres deben tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El o los nombres deben tener solo letras' })
    names?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    mercadopago?: string;

    @IsDefined({ message: 'El tipo de usuario debe estar definido' })
    @IsUUID('4', { message: 'El tipo de usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El tipo de usuario no puede estar vacío' })
    typeOfUser: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    twitter?: string;

}
