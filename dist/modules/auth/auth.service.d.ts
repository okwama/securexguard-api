import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Staff } from '../../entities/staff.entity';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
export declare class AuthService {
    private staffRepository;
    private jwtService;
    constructor(staffRepository: Repository<Staff>, jwtService: JwtService);
    validateStaff(identifier: string, password: string): Promise<Staff>;
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    loginSupervisor(identifier: string, password: string): Promise<LoginResponseDto>;
    getProfile(staffId: number): Promise<Staff>;
    updateProfilePicture(staffId: number, imageUrl: string): Promise<Staff>;
}
