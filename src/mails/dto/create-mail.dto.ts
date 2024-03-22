import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMailDto {

    @IsEmail({}, { message: 'Ingrese un correo válido para el remitente' })
    @IsOptional()
    @IsString({ message: 'El correo del remitente debe estar compuesto de caracteres.' })
    from?: string;

    @IsDefined({ message: 'Debe enviar el asunto.' })
    @IsNotEmpty({ message: 'El asunto no puede estar vacío.' })
    @IsString({ message: 'El asunto debe estar compuesto de caracteres.' })
    subject: string;

    @ArrayMinSize(1, { message: 'Debe enviar al menos un correo.' })
    @IsArray({ message: 'Los correos de los destinatarios deben estar en un arreglo.' })
    @IsDefined({ message: 'Debe enviar los correos de los destinatarios.' })
    @IsEmail({}, { message: 'Ingrese un correo válido del destinatario' })
    @IsNotEmpty({ message: 'Los correos de los destinatarios no pueden estar vacío.' })
    @IsString({ each: true, message: 'Los correos de los destinatarios deben estar compuesto de caracteres.' })
    to: string[];

}
