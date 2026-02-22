"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTenantQueryParams = exports.CreateTenantDto = exports.TenantResonseDto = void 0;
class TenantResonseDto {
    id_tenant;
    name;
    customDomain;
    id_plan;
    users;
}
exports.TenantResonseDto = TenantResonseDto;
class CreateTenantDto {
    name;
    customDomain;
    id_plan;
}
exports.CreateTenantDto = CreateTenantDto;
class GetTenantQueryParams {
    includeUsers;
}
exports.GetTenantQueryParams = GetTenantQueryParams;
//# sourceMappingURL=Tenant.js.map