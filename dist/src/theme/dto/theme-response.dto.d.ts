import { ThemeResponseDto as SharedThemeResponseDto } from '@RealEstate/types';
export declare class ThemeResponseDto implements SharedThemeResponseDto {
    id_theme: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
