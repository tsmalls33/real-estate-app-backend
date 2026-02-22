import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { USER_PUBLIC_SELECT, USER_AUTH_SELECT } from './projections/user.projection';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new user
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
      select: USER_PUBLIC_SELECT,
    }) as User
  }

  /**
   * Find all users (public fields only)
   */
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      select: USER_PUBLIC_SELECT,
    }) as User[]
  }

  /**
   * Find all users with custom select
   */
  async findAllWithSelect<T>(select: Prisma.UserSelect): Promise<T[]> {
    return await this.prisma.user.findMany({
      select,
    }) as T[]
  }

  /**
   * Find user by ID
   */
  async findById(id_user: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id_user },
      select: USER_PUBLIC_SELECT,
    }) as User | null
  }

  /**
   * Find user by email (public fields only by default)
   */
  async findByEmail(email: string, includePrivate: boolean = false): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: includePrivate ? USER_AUTH_SELECT : USER_PUBLIC_SELECT,
    }) as User | null;
  }

  /**
   * Find user by email with password hash (for authentication)
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: USER_AUTH_SELECT,
    }) as User | null;
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id_user: true },
    });
    return user !== null;
  }

  /**
   * Check if user exists by ID
   */
  async existsById(id_user: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id_user },
      select: { id_user: true },
    });
    return user !== null;
  }

  /**
   * Update user by ID
   */
  async update(id_user: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id_user },
      data,
      select: USER_PUBLIC_SELECT,
    }) as User;
  }

  /**
   * Delete user by ID (hard delete)
   */
  async delete(id_user: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id_user },
      select: USER_PUBLIC_SELECT,
    }) as User;
  }

  /**
   * Soft delete user by ID
   */
  async softDelete(id_user: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id_user },
      data: { isDeleted: true },
      select: USER_PUBLIC_SELECT,
    }) as User;
  }

  /**
   * Find users by tenant ID
   */
  async findByTenantId(id_tenant: string): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { id_tenant },
      select: USER_PUBLIC_SELECT,
    }) as User[];
  }

  /**
   * Find users by role
   */
  async findByRole(role: Prisma.EnumUserRolesFilter): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { role },
      select: USER_PUBLIC_SELECT,
    }) as User[];
  }

  /**
   * Count total users
   */
  async count(): Promise<number> {
    return await this.prisma.user.count();
  }

  /**
   * Count users by tenant
   */
  async countByTenant(id_tenant: string): Promise<number> {
    return await this.prisma.user.count({
      where: { id_tenant },
    });
  }

  /**
   * Find users with pagination
   */
  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    where?: Prisma.UserWhereInput,
  ): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: USER_PUBLIC_SELECT,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users: users as User[],
      total,
      page,
      limit,
    };
  }

  /**
   * Find user with relations (tenant, properties, etc.)
   */
  async findByIdWithRelations(id_user: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id_user },
      include: {
        tenant: true,
        userProperties: true,
        agentProperties: true,
        agentPayments: true,
        clients: true,
      },
    }) as User | null;
  }

  /**
   * Batch create users (useful for seeding)
   */
  async createMany(data: Prisma.UserCreateManyInput[]): Promise<Prisma.BatchPayload> {
    return await this.prisma.user.createMany({
      data,
      skipDuplicates: true,
    });
  }

  /**
   * Find users by multiple IDs
   */
  async findByIds(ids: string[]): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        id_user: {
          in: ids,
        },
      },
      select: USER_PUBLIC_SELECT,
    }) as User[];
  }
}
