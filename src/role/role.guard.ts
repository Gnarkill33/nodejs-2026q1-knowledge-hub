import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/constants';
import { UserRole } from 'src/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const normalizedRequiredRoles = requiredRoles.map((role) =>
      role.toUpperCase(),
    );

    const { user } = context.switchToHttp().getRequest();

    return normalizedRequiredRoles.includes(user.role);
  }
}
