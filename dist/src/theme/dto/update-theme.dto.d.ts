import { UpdateThemeDto as SharedUpdateThemeDto } from '@RealEstate/types';
export declare class UpdateThemeDto implements SharedUpdateThemeDto {
    name?: string;
    primary?: string;
    secondary?: string;
    accent?: string;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
