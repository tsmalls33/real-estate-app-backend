import type { PrismaClient } from '@prisma/client';
import { SeedTenantsResult, SeeUsersResult } from './seed-types';
export declare function seedUsers(prisma: PrismaClient, tenants: SeedTenantsResult): Promise<SeeUsersResult>;
