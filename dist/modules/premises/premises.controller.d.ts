import { PremisesService } from './premises.service';
import { Premises } from '../../entities/premises.entity';
export declare class PremisesController {
    private readonly premisesService;
    constructor(premisesService: PremisesService);
    getAllPremises(): Promise<Premises[]>;
    getPremisesById(id: number): Promise<Premises>;
}
