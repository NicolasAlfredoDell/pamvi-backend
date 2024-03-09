import { Injectable } from '@nestjs/common';

// DTOs
import { CreateTypesOfUserDto } from './dto/create-types-of-user.dto';
import { UpdateTypesOfUserDto } from './dto/update-types-of-user.dto';

@Injectable()
export class TypesOfUsersService {

  create(
    createTypesOfUserDto: CreateTypesOfUserDto,
  ) {
    return 'This action adds a new typesOfUser';
  }

  findAll() {
    return `This action returns all typesOfUsers`;
  }

  findOne(
    id: number,
  ) {
    return `This action returns a #${id} typesOfUser`;
  }

  update(
    id: number,
    updateTypesOfUserDto: UpdateTypesOfUserDto,
  ) {
    return `This action updates a #${id} typesOfUser`;
  }

  remove(
    id: number,
  ) {
    return `This action removes a #${id} typesOfUser`;
  }
}
