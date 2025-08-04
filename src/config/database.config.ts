import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST', '102.218.215.35'),
  port: configService.get('DB_PORT', 3306),
  username: configService.get('DB_USERNAME', 'root'),
  password: configService.get('DB_PASSWORD', ''),
  database: configService.get('DB_NAME', 'citlogis_securex'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Disabled to protect existing data
  logging: false, // Disabled to show only custom payload logs
  ssl: false, // Disable SSL for Vercel deployment
  charset: 'utf8mb4',
  timezone: '+03:00', // Kenya time zone (UTC+3)
}); 