import { IsDefined, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateTypesOfUserDto {

    @IsOptional()
    @IsString({ message: 'La descripción debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    description: string;

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

}
