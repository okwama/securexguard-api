import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Premises } from '../../entities/premises.entity';

@Injectable()
export class PremisesService {
  constructor(
    @InjectRepository(Premises)
    private premisesRepository: Repository<Premises>,
  ) {}

  async getAllPremises(): Promise<Premises[]> {
    return this.premisesRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getPremisesById(id: number): Promise<Premises> {
    const premises = await this.premisesRepository.findOne({
      where: { id },
    });
    
    if (!premises) {
      throw new Error('Premises not found');
    }
    
    return premises;
  }
} 