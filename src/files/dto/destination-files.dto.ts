import { IsArray, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class DestinationFilesDto {

    @IsString({ message: `El destino debe ser un string.` })
    @MaxLength(30, { message: `El destino debe tener como maximo 30 caracteres.` })
    @MinLength(3, { message: `El destino debe tener como minimo 3 caracteres.` })
    @IsIn(['user'], { message: `Los valores posibles son: 'user'`})
    readonly destination: string;

    @IsOptional()
    @IsString({ each: true })
    @IsArray({ message: 'Debe ser un arreglo de strings' })
    readonly filesStorageRemove: string[];

}