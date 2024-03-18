import { SetMetadata } from '@nestjs/common';

// Interfaces
import { ValidRoles } from '../interfaces/valid-roles.interface';

export const META_ROLES: string = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
    return SetMetadata(META_ROLES, args);
}
