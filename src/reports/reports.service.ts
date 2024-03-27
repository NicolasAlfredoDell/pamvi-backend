import { DataSource, Repository } from 'typeorm';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateReportDto, UpdateReportDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entites
import { Report } from './entities/report.entity';
import { User } from 'src/users/entities';

// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class ReportsService {
  
  private readonly logger = new Logger('ReportsService');

  constructor(
    @InjectRepository(Report)
    private readonly reportsServiceRepository: Repository<Report>,

    private readonly usersService: UsersService,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createReportDto: CreateReportDto,
  ) {
    const { user, ...reportDtoDetails } = createReportDto;

    const userDB = await this.usersService.findOne( user );

    if ( userDB.disabled )
      throw new BadRequestException(`El usuario está deshabilitado.`);
    
    try {
      const report = this.reportsServiceRepository.create({
        ...reportDtoDetails,
        user: userDB,
      });
      
      const reportDB = await this.reportsServiceRepository.save( report );

      return {
        message: `Reporte creado correctamente.`,
        report: [reportDB]
      };
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const reports = await this.reportsServiceRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      totals: await this.reportsServiceRepository.count(),
      reports: reports,
    }
  }

  async findOne(
    term: string,
  ) {
    let reports = await this.reportsServiceRepository.findOneBy({ id: term });

    if ( !reports )
      throw new NotFoundException(`No existe el reporte.`);

    return reports;
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
    const reports = await this.findOne(id);

    try {
      await this.reportsServiceRepository.remove( reports );
  
      return {
        message: `Reporte eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.reportsServiceRepository.createQueryBuilder('reports');

    try {
      await query
        .delete()
        .where({})
        .execute();

      return {
        message: 'Se eliminaron todos los reportes correctamente',
      }
    } catch (error) { this.handleDBException(error) }
  }

  async update(
    id: string,
    updateReportDto: UpdateReportDto,
  ) {
    const { user, ...updateReportsDeatils } = updateReportDto;

    const userDB = await this.usersService.findOne( user );

    if ( userDB.disabled )
        throw new BadRequestException(`El usuario está deshabilitado.`);

    const updateReport = await this.reportsServiceRepository.preload({
      id,
      ...updateReportsDeatils,
    });

    if ( !updateReport )
      throw new NotFoundException(`El reporte no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(updateReport);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.reportsServiceRepository.save( updateReport );

      return {
        message: `Reporte modificado correctamente.`,
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
