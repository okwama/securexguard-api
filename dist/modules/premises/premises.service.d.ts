import { Repository } from 'typeorm';
import { Premises } from '../../entities/premises.entity';
export declare class PremisesService {
    private premisesRepository;
    constructor(premisesRepository: Repository<Premises>);
    getAllPremises(): Promise<Premises[]>;
    getPremisesById(id: number): Promise<Premises>;
}
