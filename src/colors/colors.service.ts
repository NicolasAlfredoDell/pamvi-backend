import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateColorDto, UpdateColorDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {

  private readonly logger = new Logger('ColorsService');

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createColorDto: CreateColorDto,
  ) {
    try {
      const { ...colorDetails } = createColorDto;

      const color = this.colorRepository.create({
        ...colorDetails,
      });
      
      const colorDB = await this.colorRepository.save( color );

      return {
        data: [colorDB],
        message: `Color creado correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async disabled(
    id: string,
  ) {
    const color = await this.colorRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !color )
      throw new NotFoundException(`El color no existe.`);

    try {
      await this.colorRepository.save( color );

      return {
        message: 'Se deshabilito el color.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async enabled(
    id: string,
  ) {
    const color = await this.colorRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !color )
      throw new NotFoundException(`El color no existe.`);

    try {
      await this.colorRepository.save( color );

      return {
        message: 'Se habilitó el color.',
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const colors = await this.colorRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.colorRepository.count(),
      gendersOfAnimals: colors,
    }
  }

  async findOne(
    term: string,
  ) {
    let colors: Color;

    isUUID(term)
      ? colors = await this.colorRepository.findOneBy({ id: term })
      : colors = await this.colorRepository
                        .createQueryBuilder('color')
                        .where('color.name = :term', { term })
                        .getOne();

    if ( !colors )
      throw new NotFoundException(`No existe el color.`);

    return colors;
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
    const colors = await this.findOne(id);

    try {
      await this.colorRepository.remove( colors );
  
      return {
        message: `Color eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.colorRepository.createQueryBuilder('colors');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: `Colores eliminados correctamente.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateColorDto: UpdateColorDto,
  ) {
    const { ...colorDeatils } = updateColorDto;

    const color = await this.colorRepository.preload({
      id,
      ...colorDeatils,
    });

    if ( !color )
      throw new NotFoundException(`El color no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(color);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.colorRepository.save( color );

      return {
        message: `Color modificado correctamente.`,
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
