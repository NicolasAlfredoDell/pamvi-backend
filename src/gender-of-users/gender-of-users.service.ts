import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateGenderOfUserDto, UpdateGenderOfUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { GenderOfUser } from './entities/gender-of-user.entity';

@Injectable()
export class GenderOfUsersService {

  private readonly logger = new Logger('GenderOfUsersService');

  constructor(
    @InjectRepository(GenderOfUser)
    private readonly genderOfUserRepository: Repository<GenderOfUser>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createGenderOfUserDto: CreateGenderOfUserDto,
  ) {
    try {
      const { ...genderOfUsersDetails } = createGenderOfUserDto;

      const genderOfUser = this.genderOfUserRepository.create({
        ...genderOfUsersDetails,
      });
      
      const gender = await this.genderOfUserRepository.save( genderOfUser );

      return {
        data: [gender],
        message: `Genero creado correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.genderOfUserRepository.createQueryBuilder('gender-of-users');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const genderOfUser = await this.genderOfUserRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !genderOfUser )
      throw new NotFoundException(`El genero no existe.`);

    try {
      await this.genderOfUserRepository.save( genderOfUser );

      return {
        message: 'Se deshabilito el género.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const genderOfUser = await this.genderOfUserRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !genderOfUser )
      throw new NotFoundException(`El género no existe.`);

    try {
      await this.genderOfUserRepository.save( genderOfUser );

      return {
        message: 'Se habilitó el género.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const gendersOfUsers = await this.genderOfUserRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.genderOfUserRepository.count(),
      gendersOfUsers: gendersOfUsers,
    }
  }

  async findOne(
    term: string,
  ) {
    let genderOfUsers: GenderOfUser;

    isUUID(term)
      ? genderOfUsers = await this.genderOfUserRepository.findOneBy({ id: term })
      : genderOfUsers = await this.genderOfUserRepository
                        .createQueryBuilder('genderofusers')
                        .where('genderofusers.name = :term', { term })
                        .getOne();

    if ( !genderOfUsers )
      throw new NotFoundException(`No existe el género.`);

    return genderOfUsers;
  }

  async findOnePlain( term: string ) {
    const { ...rest } = await this.findOne( term );
    
    return {
      ...rest,
    }
  }

  async remove(
    id: string,
  ) {
    const genderOfUsers = await this.findOne(id);

    try {
      await this.genderOfUserRepository.remove( genderOfUsers );
  
      return {
        message: `Género eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateGenderOfUserDto: UpdateGenderOfUserDto,
  ) {
    const { ...genderOfUsersDeatils } = updateGenderOfUserDto;

    const genderOfUsers = await this.genderOfUserRepository.preload({
      id,
      ...genderOfUsersDeatils,
    });

    if ( !genderOfUsers )
      throw new NotFoundException(`El género no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(genderOfUsers);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.genderOfUserRepository.save( genderOfUsers );

      return {
        message: `Género modificado correctamente.`,
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
    if (error.code === `23505`)
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
