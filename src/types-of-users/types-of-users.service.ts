import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateTypesOfUserDto, UpdateTypesOfUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { TypesOfUser } from './entities/types-of-user.entity';

@Injectable()
export class TypesOfUsersService {

  private readonly logger = new Logger('TypesOfUsersService');

  constructor(
    @InjectRepository(TypesOfUser)
    private readonly typesOfUsersServiceRepository: Repository<TypesOfUser>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createTypesOfUserDto: CreateTypesOfUserDto,
  ) {
    try {
      const { ...typeOfUsersDetails } = createTypesOfUserDto;

      const typeOfUser = this.typesOfUsersServiceRepository.create({
        ...typeOfUsersDetails,
      });
      
      const typeOfUserDB = await this.typesOfUsersServiceRepository.save( typeOfUser );

      return {
        message: `Tipo de usuario creado correctamente.`,
        typeOfUsers: [typeOfUserDB]
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const typeOfUser = await this.typesOfUsersServiceRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !typeOfUser )
      throw new NotFoundException(`El tipo de usuario no existe.`);

    try {
      await this.typesOfUsersServiceRepository.save( typeOfUser );

      return {
        message: 'Se deshabilito el tipo de usuario.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const typeOfUser = await this.typesOfUsersServiceRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !typeOfUser )
      throw new NotFoundException(`El tipo de usuario no existe.`);

    try {
      await this.typesOfUsersServiceRepository.save( typeOfUser );

      return {
        message: 'Se habilitó el tipo de usuario.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0, } = paginationDto;

    const typesOfUsers = await this.typesOfUsersServiceRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.typesOfUsersServiceRepository.count(),
      typesOfUsers: [typesOfUsers],
    }
  }

  async findOne(
    term: string,
  ) {
    let typesOfUsers: TypesOfUser;

    isUUID(term)
      ? typesOfUsers = await this.typesOfUsersServiceRepository.findOneBy({ id: term })
      : typesOfUsers = await this.typesOfUsersServiceRepository
                        .createQueryBuilder('typesofuser')
                        .where('typesofuser.name = :term', { term })
                        .getOne();

    if ( !typesOfUsers )
      throw new NotFoundException(`No existe el tipo de usuario.`);

    return typesOfUsers;
  }

  async findOnePlain(
    term: string,
  ) {
    const { ...rest } = await this.findOne( term );
    
    return {
      ...rest,
    }
  }

  async remove(
    id: string,
  ) {
    const typeOfUsers = await this.findOne(id);

    try {
      await this.typesOfUsersServiceRepository.remove( typeOfUsers );
  
      return {
        message: `Tipo de usuario eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.typesOfUsersServiceRepository.createQueryBuilder('types-of-users');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: 'Se eliminaron todos los tipos de usuario correctamente',
      }
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateTypesOfUserDto: UpdateTypesOfUserDto,
  ) {
    const { ...typeOfUsersDeatils } = updateTypesOfUserDto;

    const typeOfUsers = await this.typesOfUsersServiceRepository.preload({
      id,
      ...typeOfUsersDeatils,
    });

    if ( !typeOfUsers )
      throw new NotFoundException(`El tipo de usuario no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(typeOfUsers);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.typesOfUsersServiceRepository.save( typeOfUsers );

      return {
        message: `Tipo de usuario modificado correctamente.`,
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
      if ( error.detail.includes('Key (name)') )
        throw new BadRequestException(`El nombre ya se encuentra registrado.`);

      throw new BadRequestException(error.detail);
    }
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
