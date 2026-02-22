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
exports.CreateThemeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateThemeDto {
    name;
    primary;
    secondary;
    accent;
    logoIcon;
    logoBanner;
}
exports.CreateThemeDto = CreateThemeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'Default' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateThemeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: '#1976d2' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateThemeDto.prototype, "primary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: '#9c27b0' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateThemeDto.prototype, "secondary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: '#ff9800' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateThemeDto.prototype, "accent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateThemeDto.prototype, "logoIcon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateThemeDto.prototype, "logoBanner", void 0);
//# sourceMappingURL=create-theme.dto.js.map