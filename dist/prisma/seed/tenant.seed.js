"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTenants = seedTenants;
async function seedTenants(prisma) {
    const defaultTenant = await prisma.tenant.upsert({
        where: { name: 'Default Tenant' },
        update: { customDomain: null },
        create: {
            name: 'Default Tenant',
            customDomain: null,
        },
    });
    const devomartTenant = await prisma.tenant.upsert({
        where: { name: 'Devomart' },
        update: { customDomain: 'www.devomart.es' },
        create: {
            name: 'Devomart',
            customDomain: 'www.devomart.es',
        },
    });
    return {
        default: defaultTenant,
        devomart: devomartTenant,
    };
}
//# sourceMappingURL=tenant.seed.js.map