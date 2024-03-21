import { Controller, Get, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { TokensValidationService } from './tokens-validation.service';

@Controller('tokens-validation')
export class TokensValidationController {

  constructor(
    private readonly tokensValidationService: TokensValidationService,
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.tokensValidationService.findAll(paginationDto);
  }

  @Get(':id')
   // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('term') term: string,
  ) {
    return this.tokensValidationService.findOne(term);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.tokensValidationService.remove(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  removeAll(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.tokensValidationService.removeAll();
  }

}
