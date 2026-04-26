import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants';
import { UserRole } from 'src/types';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
