import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService) => ({
  secret: configService.get('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES_IN', '5h'),
  },
}); 