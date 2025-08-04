import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Staff, StaffRole, StaffStatus } from '../../entities/staff.entity';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private jwtService: JwtService,
  ) {}

  async validateStaff(identifier: string, password: string): Promise<Staff> {
    // Try to find staff by phone or employee number
    const staff = await this.staffRepository.findOne({
      where: [
        { phone: identifier },
        { empl_no: identifier }
      ]
    });

    if (!staff) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password exists
    if (!staff.password) {
      throw new UnauthorizedException('Account not properly configured');
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (staff.status !== StaffStatus.ACTIVE) {
      throw new UnauthorizedException('Account is deactivated');
    }

    return staff;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const staff = await this.validateStaff(loginDto.identifier, loginDto.password);

    const payload = {
      staffId: staff.id,
      phone: staff.phone,
      role: staff.role_id,
      name: staff.name,
    };

    const token = this.jwtService.sign(payload);

    // Remove password from staff object
    const { password, ...staffWithoutPassword } = staff;

    return {
      token,
      user: staffWithoutPassword,
    };
  }

  async loginSupervisor(identifier: string, password: string): Promise<LoginResponseDto> {
    // Try to find staff by phone or employee number
    const staff = await this.staffRepository.findOne({
      where: [
        { phone: identifier },
        { empl_no: identifier }
      ]
    });

    if (!staff) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password exists
    if (!staff.password) {
      throw new UnauthorizedException('Account not properly configured');
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if staff has supervisor role
    if (staff.role_id !== StaffRole.SUPERVISOR) {
      throw new BadRequestException('Access denied. This app is for supervisors only.');
    }

    if (staff.status !== StaffStatus.ACTIVE) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const payload = {
      staffId: staff.id,
      phone: staff.phone,
      role: staff.role_id,
      name: staff.name,
    };

    const token = this.jwtService.sign(payload);

    // Remove password from staff object
    const { password: _, ...staffWithoutPassword } = staff;

    return {
      token,
      user: staffWithoutPassword,
    };
  }

  async getProfile(staffId: number): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { id: staffId },
      relations: ['premises']
    });

    if (!staff) {
      throw new UnauthorizedException('Staff not found');
    }

    // Remove password from staff object
    const { password, ...staffWithoutPassword } = staff;
    return staffWithoutPassword as Staff;
  }

  async updateProfilePicture(staffId: number, imageUrl: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { id: staffId }
    });

    if (!staff) {
      throw new UnauthorizedException('Staff not found');
    }

    staff.photo_url = imageUrl;
    await this.staffRepository.save(staff);

    const { password, ...staffWithoutPassword } = staff;
    return staffWithoutPassword as Staff;
  }
} 