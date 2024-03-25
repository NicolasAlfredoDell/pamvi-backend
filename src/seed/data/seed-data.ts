import { v4 as uuid } from 'uuid';

// Interfaces
import { SeedData } from '../interfaces/seed-data.interface';

export const initialData: SeedData = {
    gendersOfUsers: [
        {
            created_at: new Date(),
            disabled: false,
            name: 'Hombre',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Mujer',
            updated_at: null,
        }
    ],
    typesOfUsers: [
        {
            created_at: new Date(),
            disabled: false,
            name: 'Usuario',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Administrador',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Super administrador',
            updated_at: null,
        },
    ],
    users: [
        {
            birthday: new Date('1992-04-1992'),
            created_at: new Date(),
            disabled: false,
            dni: '36302765',
            email: 'nicolasalfredodell@gmail.com',
            facebook: 'https://www.facebook.com/Nicolassdell/',
            gender: '123',
            instagram: 'https://www.instagram.com/dellnicoo/',
            lastnames: 'Dell',
            names: 'Nicolás Alfredo',
            password: '123',
            passwordConfirm: '123',
            slug: 'Nicolas_Dell_36302765',
            typeOfUser: '123',
            twitter: 'https://twitter.com/dellnicoo',
            updated_at: null,
            years: 31,
        },
    ],
};