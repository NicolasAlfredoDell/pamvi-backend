import { PartialType } from '@nestjs/mapped-types';

import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString,
    IsUrl, Matches, MaxDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

// DTOs
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @IsOptional()
    @MaxDate(new Date('2006-01-01'), { message: 'La fecha debe ser igual o anterior al año 2006' })
    @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    @Type( () => Date )
    birthday?: Date;

    @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
    @IsOptional()
    disabled?: boolean;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    facebook?: string;

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
    twitter?: string;

}
