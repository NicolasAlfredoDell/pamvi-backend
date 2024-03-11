import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsDefined, IsEmail, IsInt, IsNotEmpty, IsOptional,
    IsPositive, IsString, IsUrl, Matches, MaxDate, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateUserDto {

    @IsDefined({ message: 'La fecha de nacimiento debe estar definida' })
    // @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    // @IsDateString({}, { message: 'La fecha de nacimiento debe ser una cadena de caracteres válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    // @MaxDate(new Date('2006-01-01'), { message: 'La fecha debe ser igual o anterior al año 2006' })
    // @MinDate(new Date('1920-01-01'), { message: 'La fecha debe ser igual o posterior al año 1920' })
    birthday: Date;

    @IsDefined({ message: 'El estado debe estar definido' })
    @IsBoolean()
    @IsNotEmpty({ message: 'El estado de deshabilitado no puede estar vacío' })
    disabled: boolean;

    @IsDefined({ message: 'El DNI debe estar definido' })
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @IsString({ message: 'El DNI debe tener valores numéricos' })
    @Matches(/^[0-9]+$/, { message: 'El DNI solo acepta valores numéricos' })
    @MaxLength(8, { message: 'El DNI debe tener hasta 8 dígitos o menos' })
    @MinLength(7, { message: 'El DNI debe tener 7 dígitos o más' })
    dni: string;

    @IsDefined({ message: 'El correo debe estar definido' })
    @IsEmail()
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    email: string;

    @IsOptional()
    @IsUrl()
    facebook?: string;

    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsOptional()
    @IsUrl()
    instagram?: string;

    @IsDefined({ message: 'El apellido debe estar definido' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    lastname: string;

    @IsDefined({ message: 'El nombre debe estar definido' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido debe tener solo letras' })
    name: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseñan debe tener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsOptional()
    @IsUrl()
    twitter?: string;

    @IsDefined({ message: 'La edad debe estar definida' })
    @IsInt()
    @IsNotEmpty({ message: 'La edad no puede estar vacío' })
    @IsPositive()
    years: number;

    // FALTA GENERO
    // FALTA TIPO DE USUARIO
    // FALTA LOCACION

}
