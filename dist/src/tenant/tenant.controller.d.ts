import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { GetTenantQueryParams } from './dto/get-tenant-query-params';
import { TenantResponseDto } from './dto/tenant-response.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    create(createTenantDto: CreateTenantDto): Promise<TenantResponseDto>;
    findAll(): Promise<TenantResponseDto[]>;
    findOne(id_tenant: string, query: GetTenantQueryParams): Promise<TenantResponseDto>;
    update(id_tenant: string, updateTenantDto: UpdateTenantDto): Promise<TenantResponseDto>;
    updateTheme(id_tenant: string, id_theme: string): Promise<TenantResponseDto>;
    remove(id_tenant: string): Promise<TenantResponseDto>;
}
