import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateTokensValidationDto } from './dto/create-tokens-validation.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Entities
import { TokensValidation } from './entities/tokens-validation.entity';

@Injectable()
export class TokensValidationService {
  
  private readonly logger = new Logger('TokensValidationService');

  constructor(
    @InjectRepository(TokensValidation)
    private readonly tokensValidationRepository: Repository<TokensValidation>,
  ) {}

  async create(
    createTokensValidationDto: CreateTokensValidationDto,
  ) {
    try {
      const tokenValidation = await this.tokensValidationRepository.create(createTokensValidationDto);
      
      await this.tokensValidationRepository.save( tokenValidation );
    } catch (error) { this.handleDBException(error) }
  }

  async findAll(
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const tokensValidation = await this.tokensValidationRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      tokens: tokensValidation,
      totals: await this.tokensValidationRepository.count(),
    }
  }

  async findOne(
    term: string,
  ) {
    let tokenValidation: TokensValidation;

    isUUID(term)
    ? tokenValidation = await this.tokensValidationRepository.findOneBy({ id: term })
    : tokenValidation = await this.tokensValidationRepository
                      .createQueryBuilder('tokenValidation')
                      .where('tokenValidation.token = :term', { term })
                      .getOne();

    if ( !tokenValidation )
      throw new NotFoundException(`No existe el token.`);

    return tokenValidation;
  }

  async remove(
    id: string,
  ) {
    const tokenValidation = await this.findOne(id);

    try {
      await this.tokensValidationRepository.remove( tokenValidation );
  
      return {
        message: `Token eliminado.`,
      };
    } catch (error) { this.handleDBException(error) }
  }

  async removeAll() {
    const query = this.tokensValidationRepository.createQueryBuilder('tokensValidation');

    try {
      await query
        .delete()
        .where({})
        .execute();

        return {
          message: `Todos los tokens fueron eliminados correctamente.`,
        }
    } catch (error) { this.handleDBException(error) }
  }

  async removeAllExpired() {
    const query = this.tokensValidationRepository.createQueryBuilder('tokensValidation');

    try {
      await query
        .delete()
        .where('tuModelo.created_at < :today', { today: new Date() })
        .execute();

        return {
          message: `Todos los tokens expirados fueron eliminados correctamente.`,
        }
    } catch (error) { this.handleDBException(error) }
  }

  private handleDBException(
    error: any,
  ): never {
      if ( error.code === '23505' ) throw new BadRequestException(error.detail);
      
      this.logger.error(error);
      throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
