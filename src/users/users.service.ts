import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if ( !user ) throw new NotFoundException(`No existe el usuario.`);

    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return null;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if ( !user ) throw new NotFoundException(`No existe el usuario.`);

    await this.userRepository.remove( user );

    return `Usuario eliminado.`;
  }

  fillUsersWithSeedData( users: User[ ]) {
    return null;
  }

}
