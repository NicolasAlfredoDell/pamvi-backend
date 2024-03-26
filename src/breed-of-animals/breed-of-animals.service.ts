import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateBreedOfAnimalDto, UpdateBreedOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { BreedOfAnimal } from './entities/breed-of-animal.entity';

@Injectable()
export class BreedOfAnimalsService {

  private readonly logger = new Logger('BreedOfAnimalsService');

  constructor(
    @InjectRepository(BreedOfAnimal)
    private readonly breedOfAnimalRepository: Repository<BreedOfAnimal>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createBreedOfAnimalDto: CreateBreedOfAnimalDto,
  ) {
    try {
      const { ...breedOfAnimalDetails } = createBreedOfAnimalDto;

      const breedOfAnimal = this.breedOfAnimalRepository.create({
        ...breedOfAnimalDetails,
      });
      
      const breed = await this.breedOfAnimalRepository.save( breedOfAnimal );

      return {
        data: [breed],
        message: `Raza creada correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const breedOAnimal = await this.breedOfAnimalRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !breedOAnimal )
      throw new NotFoundException(`La raza no existe.`);

    try {
      await this.breedOfAnimalRepository.save( breedOAnimal );

      return {
        message: 'Se deshabilito la raza.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const breedOfAnimal = await this.breedOfAnimalRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !breedOfAnimal )
      throw new NotFoundException(`La raza no existe.`);

    try {
      await this.breedOfAnimalRepository.save( breedOfAnimal );

      return {
        message: 'Se habilitó la raza.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const breedOfUsers = await this.breedOfAnimalRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.breedOfAnimalRepository.count(),
      breedOfUsers: breedOfUsers,
    }
  }

  async findOne(
    term: string,
  ) {
    let breedOfAnimals: BreedOfAnimal;

    isUUID(term)
      ? breedOfAnimals = await this.breedOfAnimalRepository.findOneBy({ id: term })
      : breedOfAnimals = await this.breedOfAnimalRepository
                        .createQueryBuilder('breedofanimal')
                        .where('breedofanimal.name = :term', { term })
                        .getOne();

    if ( !breedOfAnimals )
      throw new NotFoundException(`No existe la raza.`);

    return breedOfAnimals;
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
    const breedOfAnimals = await this.findOne(id);

    try {
      await this.breedOfAnimalRepository.remove( breedOfAnimals );
  
      return {
        message: `Raza eliminada.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.breedOfAnimalRepository.createQueryBuilder('breed-of-animals');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: `Razas de animales eliminados correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateBreedOfAnimalDto: UpdateBreedOfAnimalDto,
  ) {
    const { ...breedOfAnimalDeatils } = updateBreedOfAnimalDto;

    const breedOfAnimal = await this.breedOfAnimalRepository.preload({
      id,
      ...breedOfAnimalDeatils,
    });

    if ( !breedOfAnimal )
      throw new NotFoundException(`La raza no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(breedOfAnimal);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.breedOfAnimalRepository.save( breedOfAnimal );

      return {
        message: `Raza modificada correctamente.`,
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
