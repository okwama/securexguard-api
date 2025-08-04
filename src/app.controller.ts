import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'API is healthy' })
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'eGuard API',
      version: '1.0.0',
    };
  }

  @Get('test-db')
  @ApiOperation({ summary: 'Test database connection' })
  @ApiResponse({ status: 200, description: 'Database connection test' })
  async testDb() {
    return {
      message: 'Database connection test endpoint',
      timestamp: new Date().toISOString(),
    };
  }
}
