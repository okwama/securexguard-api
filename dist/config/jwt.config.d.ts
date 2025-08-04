import { ConfigService } from '@nestjs/config';
export declare const getJwtConfig: (configService: ConfigService) => {
    secret: any;
    signOptions: {
        expiresIn: any;
    };
};
