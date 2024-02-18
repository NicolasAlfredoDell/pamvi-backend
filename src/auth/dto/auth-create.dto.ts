import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class AuthCreateDto {

    @IsString()
    @IsUUID()
    id: string;

    @IsString({ message: 'El apellido debe ser un string' })
    @MaxLength(30)
    @MinLength(2)
    readonly lastname: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    readonly name?: string;

}