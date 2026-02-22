"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const core_2 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Real Estate Backend')
        .setDescription('API documentation for the Real Estate Backend')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT access token',
        in: 'header',
    }, 'bearer')
        .addSecurityRequirements('bearer')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: false,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(app.get(core_2.Reflector)));
    console.log(`Application is running on PORT ${process.env.PORT}`);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map