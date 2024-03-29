import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl, Matches, MaxLength, MinDate } from 'class-validator';

export class CreateAnimalShelterDto {

    // Pais
    // Provincia
    // Localidad
    // Calle
    // Piso
    // Numero

    // Telefono completo

    // Tipo de Protectora

    // Recursos Disponibles: Información sobre los recursos disponibles, como espacio para animales, equipo médico, vehículos, etc.

    // Comentarios Adicionales: Cualquier otra información relevante que pueda ser útil para comprender mejor la naturaleza y el funcionamiento de la protectora.

    @IsDefined({ message: 'La fecha de creación debe estar definida' })
    @IsDate({ message: 'La fecha de creación debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de creación no puede estar vacía' })
    @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    @Type( () => Date )
    dateFounded: Date;

    @IsEmail({}, { message: 'Ingrese un correo válido' })
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    facebook?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    instagram?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    mercadopago?: string;

    @IsOptional()
    @IsString({ message: 'La misión debe tener letras' })
    @MaxLength(500, { message: 'La misión debe tener 500 caracteres o menos' })
    mission: string;

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @MaxLength(100, { message: 'El nombre debe tener 100 caracteres o menos' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

    @IsOptional()
    @IsString({ message: 'El objetivo debe tener letras' })
    @MaxLength(500, { message: 'El objetivo debe tener 500 caracteres o menos' })
    objetive: string;

    @IsDefined({ message: 'El dueño/a debe estar definido' })
    @IsUUID('4', { message: 'El dueño/a debe ser un UUID' })
    @IsNotEmpty({ message: 'El dueño/a no puede estar vacío' })
    owner: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ingrese una url válida' })
    twitter?: string;

}
