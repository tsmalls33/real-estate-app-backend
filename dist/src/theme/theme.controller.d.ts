import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemeResponseDto } from './dto/theme-response.dto';
export declare class ThemeController {
    private readonly themeService;
    constructor(themeService: ThemeService);
    create(createThemeDto: CreateThemeDto): Promise<ThemeResponseDto>;
    findAll(): Promise<ThemeResponseDto[]>;
    findOne(id_theme: string): Promise<ThemeResponseDto>;
    update(id_theme: string, updateThemeDto: UpdateThemeDto): Promise<ThemeResponseDto>;
    softDelete(id_theme: string): Promise<ThemeResponseDto>;
}
