import { IsDefined, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateGenderOfUserDto {

    @IsDefined({ message: 'Debe enviar el nombre' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

}
