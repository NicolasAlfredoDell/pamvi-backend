import { Type } from 'class-transformer';

import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID, Matches, MaxDate, MinDate } from 'class-validator';

export class CreatePetDto {

    @IsDefined({ message: 'La fecha de nacimiento debe estar definida' })
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @MaxDate(new Date('2006-01-01'), { message: 'La fecha debe ser igual o anterior al año 2006' })
    @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    @Type( () => Date )
    birthday: Date;

    @IsDefined({ message: 'La raza debe estar definida' })
    @IsUUID('4', { message: 'La raza debe ser un UUID' })
    @IsNotEmpty({ message: 'La raza no puede estar vacía' })
    breed: string;

    @IsDefined({ message: 'La altura debe estar definida' })
    @IsNotEmpty({ message: 'La altura no puede estar vacío' })
    @IsNumber({}, { message: 'La altura debe ser en número' })
    height: number;

    @IsDefined({ message: 'El número de identificación debe estar definido' })
    @IsNotEmpty({ message: 'El número de identificación no puede estar vacío' })
    @IsNumber({}, { message: 'El número de identificación debe ser en número' })
    identificationNumber: number;

    @IsDefined({ message: 'El género debe estar definido' })
    @IsUUID('4', { message: 'El género debe ser un UUID' })
    @IsNotEmpty({ message: 'El género no puede estar vacío' })
    gender: string;

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

    @IsDefined({ message: 'El número de registro debe estar definido' })
    @IsNotEmpty({ message: 'El número de registro no puede estar vacío' })
    @IsNumber({}, { message: 'El número de registro debe ser en número' })
    registrationNumber: number;

    @IsDefined({ message: 'La especie debe estar definida' })
    @IsUUID('4', { message: 'La especie debe ser un UUID' })
    @IsNotEmpty({ message: 'La especie no puede estar vacía' })
    specie: string;

    @IsDefined({ message: 'El usuario debe estar definido' })
    @IsUUID('4', { message: 'El usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    user: string;

    @IsDefined({ message: 'El peso debe estar definido' })
    @IsNotEmpty({ message: 'El peso no puede estar vacío' })
    @IsNumber({}, { message: 'El peso debe ser en número' })
    weight: number;

}
