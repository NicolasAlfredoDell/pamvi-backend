import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entites
import { User, UserImage } from './entities';

// Modules
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        avatar: true,
      }
    })

    return users.map( ( user ) => ({
      ...user,
      avatar: user.avatar.map( img => img.url )
    }));
  }

  // async create(createProductDto: CreateProductDto) {
    
  //   try {
  //     const { images = [], ...productDetails } = createProductDto;

  //     const product = this.productRepository.create({
  //       ...productDetails,
  //       images: images.map( image => this.productImageRepository.create({ url: image }) )
  //     });
      
  //     await this.productRepository.save( product );

  //     return { ...product, images };
      
  //   } catch (error) {
  //     this.handleDBExceptions(error);
  //   }


  // }

  async findOne( term: string ) {
    let user: User;

    isUUID(term)
      ? user = await this.userRepository.findOneBy({ id: term })
      : user = await this.userRepository.findOneBy({ slug: term });

    if ( !user ) throw new NotFoundException(`No existe el usuario con el termino ${term}.`);

    return user;
  }

  async findOnePlain( term: string ) {
    const { avatar = [], ...rest } = await this.findOne( term );
    
    return {
      ...rest,
      images: avatar.map( avatar => avatar.url )
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { images = [], ...userDeatils } = updateUserDto;

    const user = await this.userRepository.preload({
      id,
      ...userDeatils,
      //? ESTO SIRVE PARA EL CREATE
      //? avatar: images.map( ( image ) => this.userImageRepository.create({ url: image }) )
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if ( images ) {
        await queryRunner.manager.delete(UserImage, { user: {id} });
        user.avatar = images.map(image => this.userImageRepository.create({ url: image }));
      } else {
        
      }

      await queryRunner.manager.save( user );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      //* await this.userRepository.save( user );
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if ( !user ) throw new NotFoundException(`No existe el usuario.`);

    await this.userRepository.remove( user );

    return `Usuario eliminado.`;
  }

  async disabled(id: string) {
    const user = await this.userRepository.preload({
      id: id,
      disabled: true,
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    try {
      await this.userRepository.save( user );
      return user;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async enabled(id: string) {
    const user = await this.userRepository.preload({
      id: id,
      disabled: false,
    });

    if ( !user ) throw new NotFoundException(`Usuario con el id no existe.`);

    try {
      await this.userRepository.save( user );
      return user;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  fillUsersWithSeedData(users: User[]) {
    return null;
  }

  async deleteAllProducts() {
    const query = this.userRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }


  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(`Unexpected errors, check server logs`);
  }

}
