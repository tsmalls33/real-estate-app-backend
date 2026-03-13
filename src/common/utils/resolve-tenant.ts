import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

export function resolveTenantId(user: JwtPayload): string | undefined {
  if (user.role === 'SUPERADMIN') {
    return undefined;
  }
  return user.tenantId ?? undefined;
}
