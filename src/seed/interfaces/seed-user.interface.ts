// Entites
import { UserImage } from 'src/users/entities';

export interface SeedUser {

    avatar?:         UserImage[];
    birthday:        Date;
    disabled:        boolean;
    created_at:      Date;
    dni:             string;
    email:           string;
    facebook?:       string;
    gender:          string;
    instagram?:      string;
    lastnames:       string;
    names:           string;
    password:        string;
    passwordConfirm: string,
    slug:            string;
    twitter?:        string;
    updated_at?:     Date;
    years:           number;

}