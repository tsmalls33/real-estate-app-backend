import { PrismaClient } from '@prisma/client';
import { SeedTenantsResult } from './seed-types';

const DEFAULT_TENANTS = [
  { name: 'Default Tenant', customDomain: null as string | null },
  { name: 'Devomart', customDomain: 'www.devomart.es' },
];

export async function seedTenants(prisma: PrismaClient): Promise<SeedTenantsResult> {
  console.log('Seeding tenants...');

  const defaultTenant = await prisma.tenant.upsert({
    where: { name: DEFAULT_TENANTS[0].name },
    update: { customDomain: DEFAULT_TENANTS[0].customDomain },
    create: DEFAULT_TENANTS[0],
  });

  const devomartTenant = await prisma.tenant.upsert({
    where: { name: DEFAULT_TENANTS[1].name },
    update: { customDomain: DEFAULT_TENANTS[1].customDomain },
    create: DEFAULT_TENANTS[1],
  });

  console.log('Tenants seeded successfully');

  return {
    default: defaultTenant,
    devomart: devomartTenant,
  };
}
