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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeController = void 0;
const common_1 = require("@nestjs/common");
const theme_service_1 = require("./theme.service");
const create_theme_dto_1 = require("./dto/create-theme.dto");
const update_theme_dto_1 = require("./dto/update-theme.dto");
const response_message_decorator_1 = require("../common/decorators/response-message.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const types_1 = require("@RealEstate/types");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let ThemeController = class ThemeController {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    create(createThemeDto) {
        return this.themeService.create(createThemeDto);
    }
    findAll() {
        return this.themeService.findAll();
    }
    findOne(id_theme) {
        return this.themeService.findOne(id_theme);
    }
    update(id_theme, updateThemeDto) {
        return this.themeService.update(id_theme, updateThemeDto);
    }
    softDelete(id_theme) {
        return this.themeService.softDelete(id_theme);
    }
};
exports.ThemeController = ThemeController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('Theme created successfully'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_theme_dto_1.CreateThemeDto]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('Themes fetched successfully'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id_theme'),
    (0, response_message_decorator_1.ResponseMessage)('Theme fetched successfully'),
    __param(0, (0, common_1.Param)('id_theme')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id_theme'),
    (0, response_message_decorator_1.ResponseMessage)('Theme updated successfully'),
    __param(0, (0, common_1.Param)('id_theme')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_theme_dto_1.UpdateThemeDto]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id_theme'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, response_message_decorator_1.ResponseMessage)('Theme deleted successfully'),
    __param(0, (0, common_1.Param)('id_theme')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "softDelete", null);
exports.ThemeController = ThemeController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRoles.SUPERADMIN),
    (0, swagger_1.ApiTags)('Theme'),
    (0, common_1.Controller)('theme'),
    __metadata("design:paramtypes", [theme_service_1.ThemeService])
], ThemeController);
//# sourceMappingURL=theme.controller.js.map