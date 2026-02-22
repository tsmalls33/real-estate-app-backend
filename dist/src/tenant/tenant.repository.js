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
exports.TenantRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_projection_1 = require("./projections/tenant.projection");
let TenantRepository = class TenantRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.tenant.create({
            data,
            select: tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
    async findAll() {
        return await this.prisma.tenant.findMany({
            select: tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
    async findById(id_tenant, includeUsers = false) {
        return await this.prisma.tenant.findUnique({
            where: { id_tenant },
            select: includeUsers ? tenant_projection_1.TENANT_WITH_USERS_SELECT : tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
    async existsByName(name) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { name },
            select: { id_tenant: true },
        });
        return tenant !== null;
    }
    async existsById(id_tenant) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id_tenant },
            select: { id_tenant: true },
        });
        return tenant !== null;
    }
    async update(id_tenant, data) {
        return await this.prisma.tenant.update({
            where: { id_tenant },
            data,
            select: tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
    async delete(id_tenant) {
        return await this.prisma.tenant.delete({
            where: { id_tenant },
            select: tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
    async assignTheme(id_tenant, id_theme) {
        return await this.prisma.tenant.update({
            where: { id_tenant },
            data: { id_theme },
            select: tenant_projection_1.TENANT_PUBLIC_SELECT,
        });
    }
};
exports.TenantRepository = TenantRepository;
exports.TenantRepository = TenantRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantRepository);
//# sourceMappingURL=tenant.repository.js.map