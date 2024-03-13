// Entites
import { UserImage } from 'src/users/entities';

export interface SeedUser {

    avatar?: UserImage[];
    birthday: Date;
    disabled: boolean;
    dni: string;
    created_at: Date;
    email: string;
    facebook?: string;
    instagram?: string;
    lastnames: string;
    names: string;
    password: string;
    passwordConfirm: string,
    slug: string;
    twitter?: string;
    updated_at?: Date;
    years: number;

}