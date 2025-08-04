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
        try {
            app = await core_1.NestFactory.create(app_module_1.AppModule);
            app.use((0, helmet_1.default)({
                contentSecurityPolicy: {
                    directives: {
                        defaultSrc: ["'self'"],
                        styleSrc: ["'self'", "'unsafe-inline'"],
                        scriptSrc: ["'self'"],
                        imgSrc: ["'self'", "data:", "https:"],
                    },
                },
            }));
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
                    'https://securexguard-api.vercel.app',
                    'https://eguard-guards.vercel.app',
                    'https://eguard-securex.vercel.app',
                    'https://*.vercel.app',
                    'https://*.netlify.app'
                ],
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
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
        catch (error) {
            console.error('Failed to bootstrap app:', error);
            throw error;
        }
    }
    return app;
}
async function handler(req, res) {
    try {
        const app = await bootstrap();
        const expressApp = app.getHttpAdapter().getInstance();
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
            res.status(200).end();
            return;
        }
        return expressApp(req, res);
    }
    catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}
//# sourceMappingURL=index.js.map