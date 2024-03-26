import { IsDefined, IsHexColor, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateColorDto {

    @IsDefined({ message: 'Debe enviar el valor' })
    @IsHexColor({ message: 'Tiene que ser un valor hexadecimal' })
    @IsNotEmpty({ message: 'El valor no puede estar vacío' })
    hex: string;

    @IsDefined({ message: 'Debe enviar el nombre' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe tener letras' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'El nombre debe tener solo letras' })
    name: string;

}
