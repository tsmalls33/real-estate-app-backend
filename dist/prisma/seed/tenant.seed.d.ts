import type { PrismaClient } from '@prisma/client';
import { SeedTenantsResult } from './seed-types';
export declare function seedTenants(prisma: PrismaClient): Promise<SeedTenantsResult>;
