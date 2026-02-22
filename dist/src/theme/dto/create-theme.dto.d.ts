import { CreateThemeDto as SharedCreateThemeDto } from '@RealEstate/types';
export declare class CreateThemeDto implements SharedCreateThemeDto {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
