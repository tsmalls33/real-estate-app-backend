import { NotFoundException } from '@nestjs/common';

export type TenantScope =
  | { type: 'ALL' }
  | { type: 'TENANT'; tenantId: string };

/**
 * Throws NotFoundException if the record's tenant does not match the scope.
 * Superadmin (scope.type === 'ALL') always passes.
 */
export function assertTenantMatch(
  scope: TenantScope,
  recordTenantId: string | null,
): void {
  if (scope.type === 'ALL') return;
  if (recordTenantId !== scope.tenantId) {
    throw new NotFoundException('Record not found in your organization');
  }
}

/**
 * Returns a Prisma-compatible where-clause fragment that scopes a query to a
 * single tenant. Superadmin (scope.type === 'ALL') returns an empty object so
 * the spread is a no-op.
 *
 * @param scope  The current user's tenant scope.
 * @param path   Optional relation path for models that reach the tenant
 *               through a relation (e.g. Cost -> Property).
 *
 * @example Direct:  where: { ...tenantFilter(scope) }
 * @example Nested:  where: { ...tenantFilter(scope, 'property') }
 */
export function tenantFilter(
  scope: TenantScope,
  path?: string,
): Record<string, unknown> {
  if (scope.type === 'ALL') return {};

  const leaf = { id_tenant: scope.tenantId };
  return path ? { [path]: leaf } : leaf;
}
