"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TENANT_WITH_USERS_SELECT = exports.TENANT_PUBLIC_SELECT = void 0;
const user_projection_1 = require("../../user/projections/user.projection");
exports.TENANT_PUBLIC_SELECT = {
    id_tenant: true,
    name: true,
    customDomain: true,
    id_theme: true,
};
exports.TENANT_WITH_USERS_SELECT = {
    ...exports.TENANT_PUBLIC_SELECT,
    users: {
        select: user_projection_1.USER_PUBLIC_SELECT,
    },
};
//# sourceMappingURL=tenant.projection.js.map