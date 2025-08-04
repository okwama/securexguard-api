import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Staff } from '../../entities/staff.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private staffRepository;
    constructor(configService: ConfigService, staffRepository: Repository<Staff>);
    validate(payload: any): Promise<{
        staffId: any;
        phone: any;
        role: any;
        name: any;
    }>;
}
export {};
