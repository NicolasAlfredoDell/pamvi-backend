import { v4 as uuid } from 'uuid';

import { User } from "src/users/entities/user.entity";

export const USERS_SEED: User[] = [
    {
        id: uuid(),
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
        setFullNameAndSlug() {},
        setCreatedAt() {},
        setDisabled() {},
        setYears() {}
    }
];