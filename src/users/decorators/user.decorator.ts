import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Decorators
import { RoleProtected } from './role-protected.decorator';

// Guards
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

// Interfaces
import { ValidRoles } from '../interfaces/valid-roles.interface';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
