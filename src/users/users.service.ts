import * as bcrypt from 'bcrypt';

import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto, UpdateUserDto } from './dto';
import { DestinationFilesDto } from 'src/files/dto/destination-files.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { User } from './entities';

// Services
import { GenderOfUsersService } from '../gender-of-users/gender-of-users.service';
import { TypesOfUsersService } from 'src/types-of-users/types-of-users.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,

    private readonly filesService: FilesService,

    private readonly genderOfUsersService: GenderOfUsersService,

    private readonly typeOfUsersService: TypesOfUsersService,
  ) { }

  async create(
    createUserDto: CreateUserDto,
    avatar?: Express.Multer.File,
  ) {
    const { gender, password, passwordConfirm, typeOfUser, ...userDetails } = createUserDto;

    if ( password !== passwordConfirm )
            throw new BadRequestException(`Las contraseñas no son iguales.`);

    let userDB = await this.findOne( userDetails.email );
    if ( userDB )
        throw new BadRequestException(`El correo ya se encuentra registrado.`);

    userDB = await this.findOne( userDetails.dni );
    if ( userDB )
        throw new BadRequestException(`El dni ya se encuentra registrado.`);

    const genderDB = await this.genderOfUsersService.findOne(gender);

    if ( genderDB.disabled )
      throw new BadRequestException(`El género está deshabilitado.`);

    const typeOfUserDB = await this.typeOfUsersService.findOne(typeOfUser);

    if ( typeOfUserDB.disabled )
      throw new BadRequestException(`El tipo de usuario está deshabilitado.`);

    let filesName = null;
    if ( avatar ) {
      const destinationFilesDto: DestinationFilesDto = {
        destination: 'users',
        filesStorageRemove: null,
      };
      const data = await this.filesService.uploadFiles( destinationFilesDto, [avatar] );
      filesName = data.filesName;
    }

    try {
      const user = await this.userRepository.create({
        ...userDetails,
        avatar: filesName[0] ? filesName[0] : null,
        gender: genderDB,
        images: [],
        password: bcrypt.hashSync(password, 10),
        typeOfUser: typeOfUserDB,
      });
      
      await this.userRepository.save( user );

      return { ...user };
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
        images: true,
      },
    });

    return {
      totals: await this.userRepository.count(),
      users: users.map(
        ( user ) => ({
          ...user,
          images: user.images.map( img => img.url )
        })
      )
    }
  }

  async findOne(
    term: string,
  ) {
    let user: User = null;

    isUUID(term)
      ? user = await this.userRepository.findOneBy({ id: term })
      : user = await this.userRepository
                        .createQueryBuilder('user')
                        .where('user.dni = :term OR user.email = :term', { term })
                        .getOne();

    return user;
  }

  async findOnePlain(
    term: string,
  ) {
    const { images = [], ...rest } = await this.findOne( term );
    
    return {
      ...rest,
      images: images.map( image => image.url )
    }
  }

  async remove(
    id: string,
  ) {
    const user = await this.findOne(id);

    const destinationFilesDto: DestinationFilesDto = { destination: 'users', filesStorageRemove: [user.avatar] };
    await this.filesService.removeFilesInDirectory(destinationFilesDto);

    try {
      await this.userRepository.remove( user );
  
      return {
        message: `Usuario eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.userRepository.createQueryBuilder('user');

    const users = await this.userRepository.find({});
    const destinationFilesDto: DestinationFilesDto = { destination: 'users', filesStorageRemove: [] };
    users.forEach( ( user: User ) => {
      destinationFilesDto.filesStorageRemove.push( user.avatar );
    });
    await this.filesService.removeFilesInDirectory(destinationFilesDto);

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
    avatar: Express.Multer.File,
  ) {
    const { gender, typeOfUser, ...userDetails } = updateUserDto;

    const genderDB = await this.genderOfUsersService.findOne(gender);

    if ( genderDB.disabled )
      throw new BadRequestException(`El género está deshabilitado.`);

    const typeOfUserDB = await this.typeOfUsersService.findOne(typeOfUser);

    if ( typeOfUserDB.disabled )
      throw new BadRequestException(`El tipo de usuario está deshabilitado.`);

    const user: any = await this.userRepository.preload({
      id,
      ...userDetails,
      gender: genderDB,
      typeOfUser: typeOfUserDB,
    });

    if ( !user )
      throw new NotFoundException(`El usuario no existe.`);
    
    if ( avatar ) {
      const destinationFilesDto: DestinationFilesDto = { destination: 'users', filesStorageRemove: [user.avatar] };
      const { filesName } = await this.filesService.uploadFiles(destinationFilesDto, [avatar]);
      user.avatar = filesName[0];
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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
