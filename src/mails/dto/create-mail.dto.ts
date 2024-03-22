import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateMailDto {

    @IsDefined({ message: 'Debe enviar el correo del remitente.' })
    @IsNotEmpty({ message: 'El correo del remitente no puede estar vacío.' })
    from: string;

    @IsDefined({ message: 'Debe enviar el cuerpo del correo.' })
    @IsNotEmpty({ message: 'El cuerpo del correo no puede estar vacío.' })
    @IsString({ message: 'El cuerpo del correo debe estar compuesto de caracteres.' })
    html: string;

    @IsDefined({ message: 'Debe enviar el asunto.' })
    @IsNotEmpty({ message: 'El asunto no puede estar vacío.' })
    @IsString({ message: 'El asunto debe estar compuesto de caracteres.' })
    subject: string;

    @IsDefined({ message: 'Debe enviar el cuerpo del correo.' })
    @IsNotEmpty({ message: 'El cuerpo del correo no puede estar vacío.' })
    @IsString({ message: 'El cuerpo del correo debe estar compuesto de caracteres.' })
    text: string;

    @ArrayMinSize(1, { message: 'Debe enviar al menos un correo.' })
    @IsArray({ message: 'Los correos de los destinatarios deben estar en un arreglo.' })
    @IsDefined({ message: 'Debe enviar los correos de los destinatarios.' })
    @IsNotEmpty({ message: 'Los correos de los destinatarios no pueden estar vacío.' })
    to: string[];

}
