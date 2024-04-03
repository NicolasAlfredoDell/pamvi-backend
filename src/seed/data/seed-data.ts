// Interfaces
import { SeedData } from '../interfaces/seed-data.interface';

export const initialData: SeedData = {
    breedOfAnimals: [
        {
            created_at: new Date(),
            disabled: false,
            name: 'Canario',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Cobaya',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Conejo',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Erizo',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Gato',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Hamster',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Hurón',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Lagarto',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Loro',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Paloma',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Perico',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Pez',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Perro',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Rana',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Rata',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Salamandra',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Serpiente',
            updated_at: null,
        },
        {
            created_at: new Date(),
            disabled: false,
            name: 'Tortuga',
            updated_at: null,
        },
    ],
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
            name: 'Indefinido',
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
            description: 'Tienes ganas de ayudar administrando la aplicación.',
            disabled: false,
            name: 'Administrador',
            updated_at: null,
        },
        {
            created_at: new Date(),
            description: 'Eres el dueño de la aplicación.',
            disabled: false,
            name: 'Super administrador',
            updated_at: null,
        },
        {
            created_at: new Date(),
            description: 'Tienes mascotas, quieres registrarlas para llevar un control y/o quieres poner mascotas en adopción.',
            disabled: false,
            name: 'Usuario',
            updated_at: null,
        },
    ],
    users: [
        {
            birthday: new Date('27-04-1992'),
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