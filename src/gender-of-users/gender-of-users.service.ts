import { Injectable } from '@nestjs/common';

// DTOs
import { CreateGenderOfUserDto } from './dto/create-gender-of-user.dto';
import { UpdateGenderOfUserDto } from './dto/update-gender-of-user.dto';

@Injectable()
export class GenderOfUsersService {

  create(
    createGenderOfUserDto: CreateGenderOfUserDto,
  ) {
    return 'This action adds a new genderOfUser';
  }

  findAll() {
    return `This action returns all genderOfUsers`;
  }

  findOne(
    id: number,
  ) {
    return `This action returns a #${id} genderOfUser`;
  }

  update(
    id: number,
    updateGenderOfUserDto: UpdateGenderOfUserDto,
  ) {
    return `This action updates a #${id} genderOfUser`;
  }

  remove(
    id: number,
  ) {
    return `This action removes a #${id} genderOfUser`;
  }
}
