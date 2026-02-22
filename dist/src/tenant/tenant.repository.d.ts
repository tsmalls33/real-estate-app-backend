import { PrismaService } from '../prisma/prisma.service';
import { Tenant, Prisma } from '@prisma/client';
export declare class TenantRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TenantCreateInput): Promise<Tenant>;
    findAll(): Promise<Tenant[]>;
    findById(id_tenant: string, includeUsers?: boolean): Promise<Tenant | null>;
    existsByName(name: string): Promise<boolean>;
    existsById(id_tenant: string): Promise<boolean>;
    update(id_tenant: string, data: Prisma.TenantUpdateInput): Promise<Tenant>;
    delete(id_tenant: string): Promise<Tenant>;
    assignTheme(id_tenant: string, id_theme: string): Promise<Tenant>;
}
