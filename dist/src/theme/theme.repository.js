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
exports.ThemeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ThemeRepository = class ThemeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.theme.findMany({
            where: { isDeleted: false },
            orderBy: { name: 'asc' },
        });
    }
    async findById(id_theme) {
        return await this.prisma.theme.findUnique({
            where: { id_theme, isDeleted: false },
        });
    }
    async existsById(id_theme) {
        const theme = await this.prisma.theme.findUnique({
            where: { id_theme, isDeleted: false },
            select: { id_theme: true },
        });
        return theme !== null;
    }
    async create(data) {
        return await this.prisma.theme.create({ data });
    }
    async update(id_theme, data) {
        return await this.prisma.theme.update({
            where: { id_theme },
            data,
        });
    }
    async softDelete(id_theme) {
        return await this.prisma.theme.update({
            where: { id_theme },
            data: { isDeleted: true },
        });
    }
};
exports.ThemeRepository = ThemeRepository;
exports.ThemeRepository = ThemeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThemeRepository);
//# sourceMappingURL=theme.repository.js.map