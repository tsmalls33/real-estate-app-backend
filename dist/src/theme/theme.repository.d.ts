import { PrismaService } from '../prisma/prisma.service';
import { Theme, Prisma } from '@prisma/client';
export declare class ThemeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Theme[]>;
    findById(id_theme: string): Promise<Theme | null>;
    existsById(id_theme: string): Promise<boolean>;
    create(data: Prisma.ThemeCreateInput): Promise<Theme>;
    update(id_theme: string, data: Prisma.ThemeUpdateInput): Promise<Theme>;
    softDelete(id_theme: string): Promise<Theme>;
}
