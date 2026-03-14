export type TenantScope =
  | { type: 'ALL' }
  | { type: 'TENANT'; tenantId: string };
