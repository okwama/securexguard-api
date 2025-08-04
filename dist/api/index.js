"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
let app;
async function bootstrap() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use((0, helmet_1.default)());
        app.enableCors({
            origin: [
                'http://localhost:3000',
                'http://localhost:8080',
                'http://192.168.100.14:57597',
                'http://localhost:57597',
                'capacitor://localhost',
                'ionic://localhost',
                'http://localhost',
                'https://securex-api.vercel.app',
                'https://securex-api-git-main-okwamas-projects.vercel.app',
                'https://securexguard-ef1l25jex-okwamas-projects.vercel.app',
                'https://securexguard-api.vercel.app'
            ],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        app.setGlobalPrefix('api');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('eGuard API')
            .setDescription('API for eGuard Security Management System')
            .setVersion('1.0')
            .addBearerAuth()
            .addTag('auth', 'Authentication endpoints')
            .addTag('users', 'User management')
            .addTag('journey-plans', 'Journey plan management')
            .addTag('premises', 'Premises management')
            .addTag('sos', 'SOS emergency system')
            .addTag('leave', 'Leave management')
            .addTag('reports', 'Reporting system')
            .addTag('orders', 'Order management')
            .addTag('visitors', 'Visitor management')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        await app.init();
        console.log('🚀 eGuard API is running in production mode (Vercel)');
    }
    return app;
}
async function handler(req, res) {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
}
//# sourceMappingURL=index.js.map