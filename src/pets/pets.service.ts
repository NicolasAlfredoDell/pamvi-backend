import { validate as isUUID } from 'uuid';

import { DataSource } from 'typeorm/data-source/DataSource';
import { Repository } from 'typeorm/repository/Repository';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { Pet } from './entities/pet.entity';

// Services
import { BreedOfAnimalsService } from 'src/breed-of-animals/breed-of-animals.service';
import { ColorsService } from 'src/colors/colors.service';
import { GenderOfAnimalsService } from 'src/gender-of-animals/gender-of-animals.service';
import { SpeciesOfAnimalsService } from '../species-of-animals/species-of-animals.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PetsService {

  private readonly logger = new Logger('PetsService');

  constructor(
    @InjectRepository(Pet)
    private readonly petsServiceRepository: Repository<Pet>,

    private readonly breedOfAnimalsService: BreedOfAnimalsService,

    private readonly dataSource: DataSource,

    private readonly colorService: ColorsService,

    private readonly genderOfAnimalService: GenderOfAnimalsService,

    private readonly speciesOfAnimalsService: SpeciesOfAnimalsService,

    private readonly userService: UsersService,
  ) { }

  async create(
    createPetDto: CreatePetDto,
  ) {
    try {
      const { breed, gender, predominantColor, specie, userOwner, ...petDetails } = createPetDto;

      let createPet: any = {
        ...petDetails,
      };

      if ( userOwner ) {
        const userDB = await this.userService.findOne(userOwner);

        if ( userDB.disabled )
          throw new BadRequestException(`El usuario está deshabilitado.`);

        createPet.user = userDB;
      }

      if ( specie ) {
        const specieOfAnimalsDB = await this.speciesOfAnimalsService.findOne(specie);

        if ( specieOfAnimalsDB.disabled )
          throw new BadRequestException(`La especie de animal está deshabilitado.`);

        createPet.specie = specieOfAnimalsDB;
      }

      if ( breed ) {
        const breedOfAnimalDB = await this.breedOfAnimalsService.findOne(breed);

        if ( breedOfAnimalDB.disabled )
          throw new BadRequestException(`La raza está deshabilitada.`);

        createPet.breed = breedOfAnimalDB;
      }

      if ( gender ) {
        const genderOfAnimalDB = await this.genderOfAnimalService.findOne(gender);

        if ( genderOfAnimalDB.disabled )
          throw new BadRequestException(`El género está deshabilitado.`);

        createPet.gender = genderOfAnimalDB;
      }

      if ( predominantColor ) {
        const colorDB = await this.colorService.findOne(predominantColor);

        if ( colorDB.disabled )
          throw new BadRequestException(`El color está deshabilitado.`);

        createPet.predominantColor = colorDB;
      }

      const pet = this.petsServiceRepository.create(createPet);
      
      const petDB = await this.petsServiceRepository.save( pet );

      return {
        message: `Mascota creada correctamente.`,
        typeOfUsers: [petDB]
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const pet = await this.petsServiceRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !pet )
      throw new NotFoundException(`La mascota no existe.`);

    try {
      await this.petsServiceRepository.save( pet );

      return {
        message: 'Se deshabilito la mascota.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const pet = await this.petsServiceRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !pet )
      throw new NotFoundException(`La mascota no existe.`);

    try {
      await this.petsServiceRepository.save( pet );

      return {
        message: 'Se habilitó la mascota.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const pets = await this.petsServiceRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.petsServiceRepository.count(),
      pets: [pets],
    }
  }

  async findOne(
    term: string,
  ) {
    let pets: Pet;

    isUUID(term)
      ? pets = await this.petsServiceRepository.findOneBy({ id: term })
      : pets = await this.petsServiceRepository
                        .createQueryBuilder('pet')
                        .where('pet.name = :term', { term })
                        .getOne();

    if ( !pets )
      throw new NotFoundException(`No existe la mascota.`);

    return pets;
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
    const pet = await this.findOne(id);

    try {
      await this.petsServiceRepository.remove( pet );
  
      return {
        message: `Mascota eliminada.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.petsServiceRepository.createQueryBuilder('pet');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: 'Se eliminaron todas las mascotas',
      }
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updatePetDto: UpdatePetDto,
  ) {
    const { breed, gender, predominantColor, specie, userOwner, ...petDeatils } = updatePetDto;

    let createPet: any = {
      ...petDeatils
    };

    if ( userOwner ) {
      const userDB = await this.userService.findOne(userOwner);

      if ( userDB.disabled )
        throw new BadRequestException(`El usuario está deshabilitado.`);

      createPet.user = userDB;
    }

    if ( specie ) {
      const specieOfAnimalsDB = await this.speciesOfAnimalsService.findOne(specie);

      if ( specieOfAnimalsDB.disabled )
        throw new BadRequestException(`La especie de animal está deshabilitado.`);

      createPet.specie = specieOfAnimalsDB;
    }

    if ( gender ) {
      const genderOfAnimalDB = await this.genderOfAnimalService.findOne(gender);

      if ( genderOfAnimalDB.disabled )
        throw new BadRequestException(`El género está deshabilitado.`);

      createPet.gender = genderOfAnimalDB;
    }

    if ( breed ) {
      const breedOfAnimalDB = await this.breedOfAnimalsService.findOne(breed);

      if ( breedOfAnimalDB.disabled )
        throw new BadRequestException(`La raza está deshabilitada.`);

      createPet.breed = breedOfAnimalDB;
    }

    if ( predominantColor ) {
      const colorDB = await this.colorService.findOne(predominantColor);

      if ( colorDB.disabled )
        throw new BadRequestException(`El color está deshabilitado.`);

      createPet.predominantColor = colorDB;
    }

    const pet = await this.petsServiceRepository.preload({
      id,
      ...createPet,
    });

    if ( !pet )
      throw new NotFoundException(`La mascota no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(pet);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.petsServiceRepository.save( pet );

      return {
        message: `Mascota modificada correctamente.`,
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
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
