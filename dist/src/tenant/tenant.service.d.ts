import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantResponseDto } from './dto/tenant-response.dto';
import { TenantRepository } from './tenant.repository';
import { ThemeService } from '../theme/theme.service';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly themeService;
    constructor(tenantRepository: TenantRepository, themeService: ThemeService);
    createTenant(createTenantDto: CreateTenantDto): Promise<TenantResponseDto>;
    findAll(): Promise<TenantResponseDto[]>;
    findOne(id_tenant: string, includeUsers?: boolean): Promise<TenantResponseDto>;
    update(id_tenant: string, input: UpdateTenantDto): Promise<TenantResponseDto>;
    remove(id_tenant: string): Promise<TenantResponseDto>;
    updateTheme(id_tenant: string, id_theme: string): Promise<TenantResponseDto>;
}
