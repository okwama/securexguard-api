import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff, StaffStatus } from '../../entities/staff.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
    });
  }

  async validate(payload: any) {
    const staff = await this.staffRepository.findOne({
      where: { id: payload.staffId }
    });

    if (!staff || staff.status !== StaffStatus.ACTIVE) {
      throw new UnauthorizedException('Staff not found or inactive');
    }

    return {
      staffId: payload.staffId,
      phone: payload.phone,
      role: payload.role,
      name: payload.name,
    };
  }
} 