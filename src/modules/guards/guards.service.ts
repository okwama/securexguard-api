import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guard } from '../../entities/guard.entity';
import { Premises } from '../../entities/premises.entity';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private guardRepository: Repository<Guard>,
    @InjectRepository(Premises)
    private premisesRepository: Repository<Premises>,
  ) {}

  async getGuardsByPremise(premiseId: number): Promise<Guard[]> {
    console.log(`🔵 GET GUARDS REQUEST - Premise ID: ${premiseId}`);
    
    // First verify the premise exists
    const premise = await this.premisesRepository.findOne({
      where: { id: premiseId },
    });

    if (!premise) {
      console.log(`❌ GET GUARDS ERROR - Premise not found with ID: ${premiseId}`);
      throw new NotFoundException('Premise not found');
    }

    console.log(`✅ Premise found: ${premise.name} (ID: ${premise.id})`);

    // Get ALL guards first to see what we have
    const allGuards = await this.guardRepository.find({
      where: { status: 1 }, // Only active guards
      relations: ['premise'],
    });

    console.log(`📊 ALL ACTIVE GUARDS (${allGuards.length}):`);
    allGuards.forEach(guard => {
      console.log(`  - Guard ${guard.id}: ${guard.name} | Premise ID: ${guard.premiseId} | Premise: ${guard.premise?.name || 'NULL'}`);
    });

    // Get guards assigned to this premise (exclude null premiseId)
    const guards = await this.guardRepository
      .createQueryBuilder('guard')
      .leftJoinAndSelect('guard.premise', 'premise')
      .where('guard.premiseId = :premiseId', { premiseId })
      .andWhere('guard.status = :status', { status: 1 })
      .orderBy('guard.name', 'ASC')
      .getMany();

    console.log(`✅ GET GUARDS SUCCESS - Found ${guards.length} guards for premise ${premiseId}:`);
    guards.forEach(guard => {
      console.log(`  - ${guard.name} (ID: ${guard.id}) | Employee: ${guard.emplNo} | Premise: ${guard.premise?.name || 'NULL'}`);
    });
    
    return guards;
  }

  async getAllGuards(): Promise<Guard[]> {
    console.log(`🔵 GET ALL GUARDS REQUEST`);
    
    const guards = await this.guardRepository.find({
      where: { status: 1 }, // Only active guards
      relations: ['premise'],
      order: { name: 'ASC' },
    });

    console.log(`✅ GET ALL GUARDS SUCCESS - Found ${guards.length} guards`);
    
    return guards;
  }

  async getGuardById(id: number): Promise<Guard> {
    console.log(`🔵 GET GUARD REQUEST - Guard ID: ${id}`);
    
    const guard = await this.guardRepository.findOne({
      where: { id, status: 1 },
      relations: ['premise'],
    });

    if (!guard) {
      console.log(`❌ GET GUARD ERROR - Guard not found with ID: ${id}`);
      throw new NotFoundException('Guard not found');
    }

    console.log(`✅ GET GUARD SUCCESS - Found guard: ${guard.name}`);
    
    return guard;
  }
} 