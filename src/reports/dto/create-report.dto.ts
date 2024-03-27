import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateReportDto {

    @IsDefined({ message: 'Debe enviar el motivo.' })
    @IsNotEmpty({ message: 'El motivo no puede estar vacío.' })
    @IsString({ message: 'El motivo debe estar compuesto de caracteres.' })
    @MinLength(1, { message: `El motivo debe tener como mínimo 1 caracter.` })
    @MaxLength(500, { message: `El motivo debe tener como máximo 500 caracteres.` })
    reason: string;

    @IsDefined({ message: 'El usuario debe estar definido' })
    @IsUUID('4', { message: 'El usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    user: string;

}
