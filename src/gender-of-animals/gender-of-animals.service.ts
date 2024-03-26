import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateGenderOfAnimalDto, UpdateGenderOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { GenderOfAnimal } from './entities/gender-of-animal.entity';

@Injectable()
export class GenderOfAnimalsService {
  
  private readonly logger = new Logger('GenderOfAnimalsService');

  constructor(
    @InjectRepository(GenderOfAnimal)
    private readonly genderOfAnimalRepository: Repository<GenderOfAnimal>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createGenderOfAnimalDto: CreateGenderOfAnimalDto,
  ) {
    try {
      const { ...genderOfAnimalsDetails } = createGenderOfAnimalDto;

      const genderOfAnimal = this.genderOfAnimalRepository.create({
        ...genderOfAnimalsDetails,
      });
      
      const gender = await this.genderOfAnimalRepository.save( genderOfAnimal );

      return {
        data: [gender],
        message: `Genero creado correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const genderOfAnimal = await this.genderOfAnimalRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !genderOfAnimal )
      throw new NotFoundException(`El genero no existe.`);

    try {
      await this.genderOfAnimalRepository.save( genderOfAnimal );

      return {
        message: 'Se deshabilito el género.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const genderOfAnimal = await this.genderOfAnimalRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !genderOfAnimal )
      throw new NotFoundException(`El género no existe.`);

    try {
      await this.genderOfAnimalRepository.save( genderOfAnimal );

      return {
        message: 'Se habilitó el género.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const gendersOfAnimals = await this.genderOfAnimalRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.genderOfAnimalRepository.count(),
      gendersOfAnimals: gendersOfAnimals,
    }
  }

  async findOne(
    term: string,
  ) {
    let genderOfAnimals: GenderOfAnimal;

    isUUID(term)
      ? genderOfAnimals = await this.genderOfAnimalRepository.findOneBy({ id: term })
      : genderOfAnimals = await this.genderOfAnimalRepository
                        .createQueryBuilder('genderofanimal')
                        .where('genderofanimal.name = :term', { term })
                        .getOne();

    if ( !genderOfAnimals )
      throw new NotFoundException(`No existe el género.`);

    return genderOfAnimals;
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
    const genderOfAnimals = await this.findOne(id);

    try {
      await this.genderOfAnimalRepository.remove( genderOfAnimals );
  
      return {
        message: `Género eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.genderOfAnimalRepository.createQueryBuilder('gender-of-animals');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: `Géneros eliminados correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateGenderOfAnimalDto: UpdateGenderOfAnimalDto,
  ) {
    const { ...genderOfAnimalsDeatils } = updateGenderOfAnimalDto;

    const genderOfAnimals = await this.genderOfAnimalRepository.preload({
      id,
      ...genderOfAnimalsDeatils,
    });

    if ( !genderOfAnimals )
      throw new NotFoundException(`El género no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(genderOfAnimals);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.genderOfAnimalRepository.save( genderOfAnimals );

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
    if ( error.code === '23505' ) {
      if ( error.detail.includes('Key (name)') )
          throw new BadRequestException(`El nombre ya se encuentra registrado.`);

      throw new BadRequestException(error.detail);
    }
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
