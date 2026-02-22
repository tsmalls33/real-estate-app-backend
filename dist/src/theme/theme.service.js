"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
const common_1 = require("@nestjs/common");
const theme_repository_1 = require("./theme.repository");
let ThemeService = class ThemeService {
    themeRepository;
    constructor(themeRepository) {
        this.themeRepository = themeRepository;
    }
    async create(createThemeDto) {
        return this.themeRepository.create(createThemeDto);
    }
    async findAll() {
        return this.themeRepository.findAll();
    }
    async findOne(id_theme) {
        const theme = await this.themeRepository.findById(id_theme);
        if (!theme)
            throw new common_1.NotFoundException(`Theme with id '${id_theme}' not found`);
        return theme;
    }
    async update(id_theme, updateThemeDto) {
        const themeExists = await this.themeRepository.existsById(id_theme);
        if (!themeExists)
            throw new common_1.NotFoundException(`Theme with id '${id_theme}' not found`);
        return this.themeRepository.update(id_theme, updateThemeDto);
    }
    async softDelete(id_theme) {
        const themeExists = await this.themeRepository.existsById(id_theme);
        if (!themeExists)
            throw new common_1.NotFoundException(`Theme with id '${id_theme}' not found`);
        return this.themeRepository.softDelete(id_theme);
    }
};
exports.ThemeService = ThemeService;
exports.ThemeService = ThemeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [theme_repository_1.ThemeRepository])
], ThemeService);
//# sourceMappingURL=theme.service.js.map