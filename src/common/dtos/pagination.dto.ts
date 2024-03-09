import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

    @IsOptional()
    @IsPositive({ message: 'El limite debe ser positivo (mayor a 0).' })
    @Min(1, { message: 'El limite debe ser igual o mayor a 1.' })
    @Type( () => Number )
    limit?: number;

    @IsOptional()
    @Min(0, { message: 'El limite debe ser igual o mayor a 0.' })
    @Type( () => Number )
    offset?: number;

}