import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entites
import { User, UserImage } from './entities';

// Modules
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { images = [], ...userDetails } = createUserDto;

      const user = this.userRepository.create({
        ...userDetails,
        avatar: images.map( image => this.userImageRepository.create({ url: image }) )
      });
      
      await this.userRepository.save( user );

      return { ...user, images };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async disabled(
    id: string,
  ) {
    const user = await this.userRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !user )
      throw new NotFoundException(`El usuario no existe.`);

    try {
      await this.userRepository.save( user );

      return {
        message: 'Se deshabilito al usuario',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        avatar: true,
      },
    });

    return {
      totals: await this.userRepository.count(),
      users: users.map(
        ( user ) => ({
          ...user,
          avatar: user.avatar.map( img => img.url )
        })
      )
    }
  }

  async findOne(
    term: string,
  ) {
    let user: User;

    isUUID(term)
      ? user = await this.userRepository.findOneBy({ id: term })
      : user = await this.userRepository
                        .createQueryBuilder('user')
                        .where('user.dni = :term OR user.email = :term', { term })
                        .getOne();

    if ( !user )
      throw new NotFoundException(`No existe el usuario.`);

    if ( user.disabled )
      throw new NotFoundException(`El usuario está deshabilitado.`);

    return user;
  }

  async findOnePlain( term: string ) {
    const { avatar = [], ...rest } = await this.findOne( term );
    
    return {
      ...rest,
      images: avatar.map( avatar => avatar.url )
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { images = [], ...userDeatils } = updateUserDto;

    const user = await this.userRepository.preload({
      id,
      ...userDeatils,
      //? ESTO SIRVE PARA EL CREATE
      //? avatar: images.map( ( image ) => this.userImageRepository.create({ url: image }) )
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if ( images ) {
        await queryRunner.manager.delete(UserImage, { user: {id} });
        user.avatar = images.map(image => this.userImageRepository.create({ url: image }));
      } else {
        
      }

      await queryRunner.manager.save( user );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      //* await this.userRepository.save( user );
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove( user );

    return `Usuario eliminado.`;
  }

  async enabled(id: string) {
    const user = await this.userRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    try {
      await this.userRepository.save( user );
      return user;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(
    error: any,
  ) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
