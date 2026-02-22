import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CLIENT_SELECT } from './projections/client.projection';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClientUncheckedCreateInput) {
    return this.prisma.client.create({ data, select: CLIENT_SELECT });
  }

  async findAll(params: {
    isActive?: boolean;
    search?: string;
    page: number;
    limit: number;
  }) {
    const { isActive, search, page, limit } = params;

    const where: Prisma.ClientWhereInput = {
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where,
        select: CLIENT_SELECT,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id_client: string) {
    return this.prisma.client.findUnique({
      where: { id_client },
      select: CLIENT_SELECT,
    });
  }

  async existsById(id_client: string) {
    return this.prisma.client.findUnique({
      where: { id_client },
      select: { id_client: true },
    });
  }

  async update(id_client: string, data: Prisma.ClientUncheckedUpdateInput) {
    return this.prisma.client.update({
      where: { id_client },
      data,
      select: CLIENT_SELECT,
    });
  }

  async softDelete(id_client: string) {
    return this.prisma.client.update({
      where: { id_client },
      data: { isActive: false },
      select: CLIENT_SELECT,
    });
  }
}
