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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_repository_1 = require("./tenant.repository");
const theme_service_1 = require("../theme/theme.service");
let TenantService = class TenantService {
    tenantRepository;
    themeService;
    constructor(tenantRepository, themeService) {
        this.tenantRepository = tenantRepository;
        this.themeService = themeService;
    }
    async createTenant(createTenantDto) {
        const isTenantExists = await this.tenantRepository.existsByName(createTenantDto.name);
        if (isTenantExists)
            throw new common_1.ConflictException('Tenant already exists');
        const dbTenant = {
            name: createTenantDto.name,
            customDomain: createTenantDto.customDomain,
            id_plan: createTenantDto.id_plan,
        };
        return this.tenantRepository.create(dbTenant);
    }
    async findAll() {
        return this.tenantRepository.findAll();
    }
    async findOne(id_tenant, includeUsers = false) {
        const foundTenant = await this.tenantRepository.findById(id_tenant, includeUsers);
        if (!foundTenant)
            throw new common_1.NotFoundException(`Tenant with id '${id_tenant}' not found`);
        return foundTenant;
    }
    async update(id_tenant, input) {
        if (!input.name &&
            !input.customDomain &&
            !input.id_plan) {
            throw new common_1.ConflictException('No fields to update');
        }
        if (input.name) {
            const isTenantExists = await this.tenantRepository.existsByName(input.name);
            if (isTenantExists) {
                throw new common_1.ConflictException(`Tenant name '${input.name}' already exists`);
            }
        }
        const tenantExists = await this.tenantRepository.existsById(id_tenant);
        if (!tenantExists)
            throw new common_1.NotFoundException(`Tenant with id '${id_tenant}' not found`);
        return this.tenantRepository.update(id_tenant, input);
    }
    async remove(id_tenant) {
        const tenantExists = await this.tenantRepository.existsById(id_tenant);
        if (!tenantExists)
            throw new common_1.NotFoundException(`Tenant with '${id_tenant}' not found`);
        return this.tenantRepository.delete(id_tenant);
    }
    async updateTheme(id_tenant, id_theme) {
        await this.themeService.findOne(id_theme);
        const tenantExists = await this.tenantRepository.existsById(id_tenant);
        if (!tenantExists)
            throw new common_1.NotFoundException(`Tenant with id '${id_tenant}' not found`);
        return this.tenantRepository.assignTheme(id_tenant, id_theme);
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_repository_1.TenantRepository,
        theme_service_1.ThemeService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map