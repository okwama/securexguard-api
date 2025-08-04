import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import helmet from 'helmet';

let app: any;

async function bootstrap() {
  if (!app) {
    try {
      app = await NestFactory.create(AppModule);

      // Security middleware
      app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
          },
        },
      }));
      
      // CORS configuration for Flutter app
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

      // Global validation pipe
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
      );

      // Global prefix
      app.setGlobalPrefix('api');

      // Swagger documentation
      const config = new DocumentBuilder()
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

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);

      await app.init();
      console.log('🚀 eGuard API is running in production mode (Vercel)');
    } catch (error) {
      console.error('Failed to bootstrap app:', error);
      throw error;
    }
  }
  
  return app;
}

// Export for Vercel
export default async function handler(req: any, res: any) {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
      res.status(200).end();
      return;
    }
    
    return expressApp(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
} 