import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());
  
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
      'https://securexguard-ef1l25jex-okwamas-projects.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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

  const port = process.env.PORT || 5000;
  
  // Only listen on port in development environment
  // In production (Vercel), the serverless function handles the listening
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(port);
    console.log(`🚀 eGuard API is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  } else {
    console.log('🚀 eGuard API is running in production mode (Vercel)');
  }
  
  return app;
}

// Start the application
bootstrap();

// Export for Vercel
export default bootstrap;
