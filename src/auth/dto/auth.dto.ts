import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {

    @IsString({ message: 'El apellido debe ser un string' })
    @MaxLength(30)
    @MinLength(2)
    readonly lastname: string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    readonly name: string;

}