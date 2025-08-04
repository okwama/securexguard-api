import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { Staff } from '../../entities/staff.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    loginSupervisor(body: {
        identifier: string;
        password: string;
    }): Promise<LoginResponseDto>;
    getProfile(user: any): Promise<Staff>;
    updateProfilePicture(user: any, body: {
        imageUrl: string;
    }): Promise<Staff>;
}
