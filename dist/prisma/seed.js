"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const theme_seed_1 = require("./seed/theme.seed");
const tenant_seed_1 = require("./seed/tenant.seed");
const user_seed_1 = require("./seed/user.seed");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Running seeds......');
    await (0, theme_seed_1.seedThemes)(prisma);
    const tenants = await (0, tenant_seed_1.seedTenants)(prisma);
    await (0, user_seed_1.seedUsers)(prisma, tenants);
}
main()
    .catch((e) => {
    console.error(e);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map