export declare class ThemeResponseDto {
    id_theme: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
export declare class CreateThemeDto {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
export declare class UpdateThemeDto {
    name?: string | null;
    primary?: string | null;
    secondary?: string | null;
    accent?: string | null;
    logoIcon?: string | null;
    logoBanner?: string | null;
}
