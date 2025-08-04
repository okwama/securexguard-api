import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardsController } from './guards.controller';
import { GuardsService } from './guards.service';
import { Guard } from '../../entities/guard.entity';
import { Premises } from '../../entities/premises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guard, Premises, ])],
  controllers: [GuardsController],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {} 