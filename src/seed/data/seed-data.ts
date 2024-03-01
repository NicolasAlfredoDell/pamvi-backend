import { v4 as uuid } from 'uuid';

// Entites
import { UserImage } from 'src/users/entities';

interface SeedUser {
    dni: string;
    birthday: Date;
    email: string;
    facebook?: string;
    instagram?: string;
    lastname: string;
    name: string;
    slug: string;
    twitter?: string;
    years: number;
    disabled: boolean;
    created_at: Date;
    updated_at?: Date;
    avatar?: UserImage[];
}

interface SeedData {
    users: SeedUser[],
}

export const initialData: SeedData = {
    users: [
        {
            dni: '36302765',
            email: 'nicolasalfredodell@gmail.com',
            birthday: new Date('1992-04-1992'),
            facebook: 'https://www.facebook.com/Nicolassdell/',
            instagram: 'https://www.instagram.com/dellnicoo/',
            lastname: 'Dell',
            name: 'Nicolas',
            slug: 'Nicolas_Dell_36302765',
            twitter: 'https://twitter.com/dellnicoo',
            years: 31,
            disabled: false,
            created_at: new Date(),
            updated_at: null,
        },
    ],
};