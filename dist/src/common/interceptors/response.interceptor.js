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
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const response_message_decorator_1 = require("../decorators/response-message.decorator");
function defaultMessageForStatus(status) {
    switch (status) {
        case 200:
            return 'OK';
        case 201:
            return 'Created';
        case 204:
            return 'No Content';
        default:
            return 'Success';
    }
}
function isAlreadyWrapped(value) {
    return (value &&
        typeof value === 'object' &&
        'code' in value &&
        'message' in value &&
        'data' in value);
}
let ResponseInterceptor = class ResponseInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const res = context.switchToHttp().getResponse();
        const customMessage = this.reflector.get(response_message_decorator_1.RESPONSE_MESSAGE_KEY, context.getHandler()) ??
            this.reflector.get(response_message_decorator_1.RESPONSE_MESSAGE_KEY, context.getClass());
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            const statusCode = res?.statusCode ?? 200;
            if (isAlreadyWrapped(data))
                return data;
            if (statusCode === 204) {
                return undefined;
            }
            return {
                code: statusCode,
                message: customMessage ?? defaultMessageForStatus(statusCode),
                data,
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map