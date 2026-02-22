import { CreateTenantDto as SharedCreateTenantDto } from '@RealEstate/types';
export declare class CreateTenantDto implements SharedCreateTenantDto {
    name: string;
    customDomain?: string;
    id_plan?: string | null;
}
