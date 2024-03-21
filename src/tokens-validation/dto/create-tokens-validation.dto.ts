import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTokensValidationDto {

    @IsDefined({ message: 'El token debe estar definido' })
    @IsNotEmpty({ message: 'El token no puede estar vacío' })
    @IsString({ message: 'El token debe ser una cadena de caracteres' })
    token: string;

}
