// Entites
import { UserImage } from 'src/users/entities';

export interface SeedUser {

    dni: string;
    birthday: Date;
    email: string;
    facebook?: string;
    instagram?: string;
    lastnames: string;
    names: string;
    password: string;
    slug: string;
    twitter?: string;
    years: number;
    disabled: boolean;
    created_at: Date;
    updated_at?: Date;
    avatar?: UserImage[];

}