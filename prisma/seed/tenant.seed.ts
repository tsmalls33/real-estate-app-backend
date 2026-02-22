import { PrismaClient, Tenant } from '@prisma/client';
import { SeedTenantsResult } from './seed-types';

const DEFAULT_TENANTS = [
  { key: 'default', name: 'Default Tenant', customDomain: null as string | null },
  { key: 'devomart', name: 'Devomart', customDomain: 'www.devomart.es' },
];

export async function seedTenants(prisma: PrismaClient): Promise<SeedTenantsResult> {
  console.log('Seeding tenants...');

  const result: Record<string, Tenant> = {};

  for (const { key, ...data } of DEFAULT_TENANTS) {
    result[key] = await prisma.tenant.upsert({
      where: { name: data.name },
      update: { customDomain: data.customDomain },
      create: data,
    });
  }

  console.log('Tenants seeded successfully');

  return result as SeedTenantsResult;
}
