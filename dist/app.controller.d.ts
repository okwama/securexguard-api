import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    health(): {
        status: string;
        timestamp: string;
        service: string;
        version: string;
    };
    testDb(): Promise<{
        message: string;
        timestamp: string;
    }>;
}
