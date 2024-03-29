import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

// Dtos
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto';

// Entites
import { User, UserImage } from './entities';

// Services
import { GenderOfUsersService } from '../gender-of-users/gender-of-users.service';
import { TypesOfUsersService } from 'src/types-of-users/types-of-users.service';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,

    private readonly dataSource: DataSource,

    private readonly genderOfUsersService: GenderOfUsersService,

    private readonly typeOfUsersService: TypesOfUsersService,
  ) { }

  async create(
    createUserDto: CreateUserDto,
  ) {
    const { gender, images = [], typeOfUser, ...userDetails } = createUserDto;

    const genderDB = await this.genderOfUsersService.findOne(gender);

    if ( genderDB.disabled )
      throw new BadRequestException(`El género está deshabilitado.`);

    const typeOfUserDB = await this.typeOfUsersService.findOne(typeOfUser);

    if ( typeOfUserDB.disabled )
      throw new BadRequestException(`El tipo de usuario está deshabilitado.`);

    try {
      const user = await this.userRepository.create({
        ...userDetails,
        avatar: images.map( image => this.userImageRepository.create({ url: image }) ),
        gender: genderDB,
        typeOfUser: typeOfUserDB,
      });
      
      await this.userRepository.save( user );

      return { ...user, images };
    } catch (error) { this.handleDBException(error) }
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

  async enabled(
    id: string,
  ) {
    const user = await this.userRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !user )
      throw new NotFoundException(`El usuario no existe.`);

    try {
      await this.userRepository.save( user );

      return {
        message: 'Se habilitó al usuario',
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

    return user;
  }

  async findOnePlain(
    term: string,
  ) {
    const { avatar = [], ...rest } = await this.findOne( term );
    
    return {
      ...rest,
      images: avatar.map( avatar => avatar.url )
    }
  }

  async remove(
    id: string,
  ) {
    const user = await this.findOne(id);

    try {
      await this.userRepository.remove( user );
  
      return {
        message: `Usuario eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: `Todos los usuarios fueron eliminados correctamente.`,
      }
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const { gender, images = [], typeOfUser, ...userDetails } = updateUserDto;

    const genderDB = await this.genderOfUsersService.findOne(gender);

    if ( genderDB.disabled )
      throw new BadRequestException(`El género está deshabilitado.`);

    const typeOfUserDB = await this.typeOfUsersService.findOne(typeOfUser);

    if ( typeOfUserDB.disabled )
      throw new BadRequestException(`El tipo de usuario está deshabilitado.`);

    const user = await this.userRepository.preload({
      id,
      ...userDetails,
      gender: genderDB,
      typeOfUser: typeOfUserDB,
      //? ESTO SIRVE PARA EL CREATE
      //? avatar: images.map( ( image ) => this.userImageRepository.create({ url: image }) )
    });

    if ( !user )
      throw new NotFoundException(`El usuario no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if ( images ) {
        await queryRunner.manager.delete( UserImage, { user: {id} } );
        user.avatar = images.map( image => this.userImageRepository.create({ url: image }) );
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.userRepository.save( user );

      return {
        message: `Usuario modificado correctamente.`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBException(error);
    }
  }

  private handleDBException(
    error: any,
  ) {
    if ( error.code === '23505' ) {
      if ( error.detail.includes('Key (dni)') )
          throw new BadRequestException(`El dni ya se encuentra registrado.`);
      
      if ( error.detail.includes('Key (email)') )
        throw new BadRequestException(`El correo ya se encuentra registrado.`);

      throw new BadRequestException(error.detail);
    }
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
