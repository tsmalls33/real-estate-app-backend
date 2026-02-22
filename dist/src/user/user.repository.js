"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_projection_1 = require("./projections/user.projection");
let UserRepository = class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.user.create({
            data,
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findAll() {
        return await this.prisma.user.findMany({
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findAllWithSelect(select) {
        return await this.prisma.user.findMany({
            select,
        });
    }
    async findById(id_user) {
        return await this.prisma.user.findUnique({
            where: { id_user },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findByEmail(email, includePrivate = false) {
        return await this.prisma.user.findUnique({
            where: { email },
            select: includePrivate ? user_projection_1.USER_AUTH_SELECT : user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findByEmailWithPassword(email) {
        return await this.prisma.user.findUnique({
            where: { email },
            select: user_projection_1.USER_AUTH_SELECT,
        });
    }
    async existsByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id_user: true },
        });
        return user !== null;
    }
    async existsById(id_user) {
        const user = await this.prisma.user.findUnique({
            where: { id_user },
            select: { id_user: true },
        });
        return user !== null;
    }
    async update(id_user, data) {
        return await this.prisma.user.update({
            where: { id_user },
            data,
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async delete(id_user) {
        return await this.prisma.user.delete({
            where: { id_user },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async softDelete(id_user) {
        return await this.prisma.user.update({
            where: { id_user },
            data: { isDeleted: true },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findByTenantId(id_tenant) {
        return await this.prisma.user.findMany({
            where: { id_tenant },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async findByRole(role) {
        return await this.prisma.user.findMany({
            where: { role },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
    async count() {
        return await this.prisma.user.count();
    }
    async countByTenant(id_tenant) {
        return await this.prisma.user.count({
            where: { id_tenant },
        });
    }
    async findWithPagination(page = 1, limit = 10, where) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: user_projection_1.USER_PUBLIC_SELECT,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            users: users,
            total,
            page,
            limit,
        };
    }
    async findByIdWithRelations(id_user) {
        return await this.prisma.user.findUnique({
            where: { id_user },
            include: {
                tenant: true,
                userProperties: true,
                agentProperties: true,
                agentPayments: true,
                clients: true,
            },
        });
    }
    async createMany(data) {
        return await this.prisma.user.createMany({
            data,
            skipDuplicates: true,
        });
    }
    async findByIds(ids) {
        return await this.prisma.user.findMany({
            where: {
                id_user: {
                    in: ids,
                },
            },
            select: user_projection_1.USER_PUBLIC_SELECT,
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map