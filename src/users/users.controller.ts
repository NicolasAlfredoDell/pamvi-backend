import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Decorators
import { Auth } from './decorators/user.decorator';

// DTOs
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto';

// Entities
import { User } from './entities';

// Interfaces
import { ValidRoles } from './interfaces/valid-roles.interface';

// Services
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':term')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('term') term: string,
  ) {
    return this.usersService.findOne(term);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.remove(id);
  }

  @Delete()
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.usersService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('avatar')
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

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
