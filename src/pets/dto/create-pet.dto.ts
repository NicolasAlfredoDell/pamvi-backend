import { IsDefined, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreatePetDto {

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

    @IsDefined({ message: 'La especie debe estar definida' })
    @IsUUID('4', { message: 'La especie debe ser un UUID' })
    @IsNotEmpty({ message: 'La especie no puede estar vacía' })
    specie: string;

    @IsDefined({ message: 'El usuario debe estar definido' })
    @IsUUID('4', { message: 'El usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    user: string;

}
