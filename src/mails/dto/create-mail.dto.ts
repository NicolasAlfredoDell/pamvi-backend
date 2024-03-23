import { ArrayMinSize, IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateMailDto {

    @IsDefined({ message: 'Debe enviar el contexto.' })
    context: any;

    @IsDefined({ message: 'Debe enviar el asunto.' })
    @IsNotEmpty({ message: 'El asunto no puede estar vacío.' })
    @IsString({ message: 'El asunto debe estar compuesto de caracteres.' })
    subject: string;

    @IsDefined({ message: 'Debe enviar la url de la plantilla.' })
    @IsNotEmpty({ message: 'La url de la plantilla no puede estar vacía.' })
    template: string;

    @ArrayMinSize(1, { message: 'Debe enviar al menos un correo.' })
    @IsArray({ message: 'Los correos de los destinatarios deben estar en un arreglo.' })
    @IsDefined({ message: 'Debe enviar los correos de los destinatarios.' })
    @IsNotEmpty({ message: 'Los correos de los destinatarios no pueden estar vacío.' })
    to: string[];

}
