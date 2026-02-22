"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const client_1 = require("@prisma/client");
const _password_1 = require("./_password");
async function seedUsers(prisma, tenants) {
    const passwordHash = await (0, _password_1.seedPasswordHash)('Password123!');
    const superadmin = await prisma.user.upsert({
        where: { email: 'superadmin@gmail.com' },
        update: { fullName: 'Super Admin', role: client_1.UserRoles.SUPERADMIN, id_tenant: null },
        create: {
            email: 'superadmin@gmail.com',
            passwordHash,
            fullName: 'Super Admin',
            role: client_1.UserRoles.SUPERADMIN,
            id_tenant: null,
        },
    });
    const defaultAdmin = await prisma.user.upsert({
        where: { email: 'admin@default.com' },
        update: {
            fullName: 'Default Admin',
            role: client_1.UserRoles.ADMIN,
            id_tenant: tenants.default.id_tenant,
        },
        create: {
            email: 'admin@default.com',
            passwordHash,
            fullName: 'Default Admin',
            role: client_1.UserRoles.ADMIN,
            id_tenant: tenants.default.id_tenant,
        },
    });
    const devomartAdmin = await prisma.user.upsert({
        where: { email: 'admin@devomart.es' },
        update: {
            fullName: 'Devomart Admin',
            role: client_1.UserRoles.ADMIN,
            id_tenant: tenants.devomart.id_tenant,
        },
        create: {
            email: 'admin@devomart.es',
            passwordHash,
            fullName: 'Devomart Admin',
            role: client_1.UserRoles.ADMIN,
            id_tenant: tenants.devomart.id_tenant,
        },
    });
    const devomartEmployee = await prisma.user.upsert({
        where: { email: 'employee@devomart.es' },
        update: {
            fullName: 'Devomart Employee',
            role: client_1.UserRoles.EMPLOYEE,
            id_tenant: tenants.devomart.id_tenant,
        },
        create: {
            email: 'employee@devomart.es',
            passwordHash,
            fullName: 'Devomart Employee',
            role: client_1.UserRoles.EMPLOYEE,
            id_tenant: tenants.devomart.id_tenant,
        },
    });
    return { superadmin, defaultAdmin, devomartAdmin, devomartEmployee };
}
//# sourceMappingURL=user.seed.js.map