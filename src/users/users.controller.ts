import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';

// Decorators
import { Auth } from './decorators/user.decorator';
import { GetUser } from './decorators/get-user.decorator';

// Dtos
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entities
import { User } from './entities';

// Interfaces
import { ValidRoles } from './interfaces/valid-roles.interface';

// Services
import { UsersService } from './users.service';
// import { IncomingHttpHeaders } from 'http';

@Controller('users')
export class UsersController {
  
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(
    @Param('term') term: string,
  ) {
    return this.usersService.findOne(term);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   return this.usersService.remove(id);
  // }

  // @Patch('disabled/:id')
  // disabled(
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   return this.usersService.disabled(id);
  // }

  // @Delete('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  // enabled(
  //   @GetUser() user: User,
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   return this.usersService.enabled(id);
  // }

  // @Delete('disabled/:id')
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // enabled(
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
  //   @Headers() headers: IncomingHttpHeaders,
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   return this.usersService.enabled(id);
  // }

}
