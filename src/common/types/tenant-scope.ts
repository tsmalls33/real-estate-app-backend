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
