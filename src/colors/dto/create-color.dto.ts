import { IsAlphanumeric, IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateColorDto {

    @IsAlphanumeric('ar', { message: 'El valor debe tener letras y/o números' })
    @IsDefined({ message: 'Debe enviar el valor' })
    @IsNotEmpty({ message: 'El valor no puede estar vacío' })
    hex: string;

    @IsDefined({ message: 'Debe enviar el nombre' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

}
