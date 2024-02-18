import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {

  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const { name, lastname } = createUserDto;

    const user: User = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      lastname,
      createdAt: new Date().getTime()
    };

    this.users.push( user );
  
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find( user => user.id == id );

    if ( !user ) throw new NotFoundException(`Usuario con el id ${id} no existe.`);
  
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let userDB = this.findOne( id );

    this.users = this.users.map( user => {
      if ( user.id == id ) {
        userDB.updatedAt = new Date().getTime();
        userDB = { ...userDB, ...UpdateUserDto };

        return userDB;
      }

      return user;
    });
  }

  remove(id: string) {
    this.users = this.users.filter( user => user.id !== id );
  }

  fillUsersWithSeedData( users: User[ ]) {
    this.users = users;
  }
}
