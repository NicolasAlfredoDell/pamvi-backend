import { v4 as uuid } from 'uuid';

// Interfaces
import { SeedData } from '../interfaces/seed-data.interface';

export const initialData: SeedData = {
    users: [
        {
            dni: '36302765',
            email: 'nicolasalfredodell@gmail.com',
            birthday: new Date('1992-04-1992'),
            facebook: 'https://www.facebook.com/Nicolassdell/',
            instagram: 'https://www.instagram.com/dellnicoo/',
            lastnames: 'Dell',
            names: 'Nicolás Alfredo',
            password: '123',
            slug: 'Nicolas_Dell_36302765',
            twitter: 'https://twitter.com/dellnicoo',
            years: 31,
            disabled: false,
            created_at: new Date(),
            updated_at: null,
        },
    ],
};