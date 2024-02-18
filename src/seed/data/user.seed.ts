import { v4 as uuid } from 'uuid';

import { User } from "src/users/entities/user.entity";

export const USERS_SEED: User[] = [
    {
        id: uuid(),
        name: 'Nicolas',
        lastname: 'Dell',
        createdAt: new Date().getTime(),
    }
];