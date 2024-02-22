import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entites
import { User } from './entities/user.entity';

// Modules
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

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

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne( term: string ) {
    let user: User;

    isUUID(term)
      ? user = await this.userRepository.findOneBy({ id: term })
      : user = await this.userRepository.findOneBy({ slug: term });

    if ( !user ) throw new NotFoundException(`No existe el usuario con el termino ${term}.`);

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    try {
      await this.userRepository.save( user );
      return user;
    } catch (error) {
      this.handleDBException(error);
    }

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

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(`Unexpected errors, check server logs`);
}

}
