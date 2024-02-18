import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastname: string;

}
