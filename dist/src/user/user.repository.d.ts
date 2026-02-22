import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findAll(): Promise<User[]>;
    findAllWithSelect<T>(select: Prisma.UserSelect): Promise<T[]>;
    findById(id_user: string): Promise<User | null>;
    findByEmail(email: string, includePrivate?: boolean): Promise<User | null>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    existsByEmail(email: string): Promise<boolean>;
    existsById(id_user: string): Promise<boolean>;
    update(id_user: string, data: Prisma.UserUpdateInput): Promise<User>;
    delete(id_user: string): Promise<User>;
    softDelete(id_user: string): Promise<User>;
    findByTenantId(id_tenant: string): Promise<User[]>;
    findByRole(role: Prisma.EnumUserRolesFilter): Promise<User[]>;
    count(): Promise<number>;
    countByTenant(id_tenant: string): Promise<number>;
    findWithPagination(page?: number, limit?: number, where?: Prisma.UserWhereInput): Promise<{
        users: User[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByIdWithRelations(id_user: string): Promise<User | null>;
    createMany(data: Prisma.UserCreateManyInput[]): Promise<Prisma.BatchPayload>;
    findByIds(ids: string[]): Promise<User[]>;
}
