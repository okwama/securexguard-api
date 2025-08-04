import { Repository } from 'typeorm';
import { Guard } from '../../entities/guard.entity';
import { Premises } from '../../entities/premises.entity';
export declare class GuardsService {
    private guardRepository;
    private premisesRepository;
    constructor(guardRepository: Repository<Guard>, premisesRepository: Repository<Premises>);
    getGuardsByPremise(premiseId: number): Promise<Guard[]>;
    getAllGuards(): Promise<Guard[]>;
    getGuardById(id: number): Promise<Guard>;
}
