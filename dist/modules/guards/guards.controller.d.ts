import { GuardsService } from './guards.service';
import { Guard } from '../../entities/guard.entity';
export declare class GuardsController {
    private readonly guardsService;
    constructor(guardsService: GuardsService);
    testGuardsModule(): Promise<{
        message: string;
        timestamp: string;
    }>;
    getAllGuards(): Promise<Guard[]>;
    getGuardsByPremise(premiseId: number): Promise<Guard[]>;
    getGuardById(id: number): Promise<Guard>;
}
