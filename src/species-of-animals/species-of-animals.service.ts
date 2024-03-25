import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateSpeciesOfAnimalDto, UpdateSpeciesOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { SpeciesOfAnimals } from './entities/species-of-animal.entity';


@Injectable()
export class SpeciesOfAnimalsService {
  
  private readonly logger = new Logger('SpeciesOfAnimalsService');

  constructor(
    @InjectRepository(SpeciesOfAnimals)
    private readonly speciesOfAnimalsServiceRepository: Repository<SpeciesOfAnimals>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createSpeciesOfAnimalDto: CreateSpeciesOfAnimalDto,
  ) {
    try {
      const { ...speciesOfAnimalDtoDetails } = createSpeciesOfAnimalDto;

      const speciesOfAnimal = this.speciesOfAnimalsServiceRepository.create({
        ...speciesOfAnimalDtoDetails,
      });
      
      const speciesOfAnimalDB = await this.speciesOfAnimalsServiceRepository.save( speciesOfAnimal );

      return {
        message: `Especie de animal creado correctamente.`,
        speciesOfAnimal: [speciesOfAnimalDB]
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const speciesOfAnimal = await this.speciesOfAnimalsServiceRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !speciesOfAnimal )
      throw new NotFoundException(`La especie de animal no existe.`);

    try {
      await this.speciesOfAnimalsServiceRepository.save( speciesOfAnimal );

      return {
        message: 'Se deshabilito la especie de animal.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const specieOfAnimal = await this.speciesOfAnimalsServiceRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !specieOfAnimal )
      throw new NotFoundException(`La especie de animal no existe.`);

    try {
      await this.speciesOfAnimalsServiceRepository.save( specieOfAnimal );

      return {
        message: 'Se habilitó la especie de animal.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const speciesOfAnimals = await this.speciesOfAnimalsServiceRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.speciesOfAnimalsServiceRepository.count(),
      speciesOfAnimals: [speciesOfAnimals],
    }
  }

  async findOne(
    term: string,
  ) {
    let speciesOfAnimals: SpeciesOfAnimals;

    isUUID(term)
      ? speciesOfAnimals = await this.speciesOfAnimalsServiceRepository.findOneBy({ id: term })
      : speciesOfAnimals = await this.speciesOfAnimalsServiceRepository
                        .createQueryBuilder('speciesOfAnimals')
                        .where('speciesOfAnimals.name = :term', { term })
                        .getOne();

    if ( !speciesOfAnimals )
      throw new NotFoundException(`No existe la especie de animal.`);

    return speciesOfAnimals;
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
    const speciesOfAnimals = await this.findOne(id);

    try {
      await this.speciesOfAnimalsServiceRepository.remove( speciesOfAnimals );
  
      return {
        message: `Especie de animal eliminada.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.speciesOfAnimalsServiceRepository.createQueryBuilder('species-of-animals');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: 'Se eliminaron todos las especies de animal correctamente',
      }
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateSpeciesOfAnimalDto: UpdateSpeciesOfAnimalDto,
  ) {
    const { ...updateSpeciesOfAnimalDeatils } = updateSpeciesOfAnimalDto;

    const updateSpeciesOfAnimal = await this.speciesOfAnimalsServiceRepository.preload({
      id,
      ...updateSpeciesOfAnimalDeatils,
    });

    if ( !updateSpeciesOfAnimal )
      throw new NotFoundException(`La especie de animal no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(updateSpeciesOfAnimal);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.speciesOfAnimalsServiceRepository.save( updateSpeciesOfAnimal );

      return {
        message: `Especie de animal modificado correctamente.`,
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
