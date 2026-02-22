import { PrismaClient, User, UserRoles } from '@prisma/client';
import { seedPasswordHash } from './_password';
import { SeedTenantsResult, SeeUsersResult } from './seed-types';

// Factory because id_tenant values depend on tenants resolved at runtime
const DEFAULT_USERS = (tenants: SeedTenantsResult) => [
  {
    key: 'superadmin',
    email: 'superadmin@gmail.com',
    fullName: 'Super Admin',
    role: UserRoles.SUPERADMIN,
    id_tenant: null as string | null,
  },
  {
    key: 'defaultAdmin',
    email: 'admin@default.com',
    fullName: 'Default Admin',
    role: UserRoles.ADMIN,
    id_tenant: tenants.default.id_tenant,
  },
  {
    key: 'devomartAdmin',
    email: 'admin@devomart.es',
    fullName: 'Devomart Admin',
    role: UserRoles.ADMIN,
    id_tenant: tenants.devomart.id_tenant,
  },
  {
    key: 'devomartEmployee',
    email: 'employee@devomart.es',
    fullName: 'Devomart Employee',
    role: UserRoles.EMPLOYEE,
    id_tenant: tenants.devomart.id_tenant,
  },
];

export async function seedUsers(
  prisma: PrismaClient,
  tenants: SeedTenantsResult,
): Promise<SeeUsersResult> {
  console.log('Seeding users...');

  const passwordHash = await seedPasswordHash('Password123!');
  const result: Record<string, User> = {};

  for (const { key, ...data } of DEFAULT_USERS(tenants)) {
    result[key] = await prisma.user.upsert({
      where: { email: data.email },
      update: { fullName: data.fullName, role: data.role, id_tenant: data.id_tenant },
      create: { ...data, passwordHash },
    });
  }

  console.log('Users seeded successfully');

  return result as SeeUsersResult;
}
