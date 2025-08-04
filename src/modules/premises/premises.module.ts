import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremisesController } from './premises.controller';
import { PremisesService } from './premises.service';
import { Premises } from '../../entities/premises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Premises])],
  controllers: [PremisesController],
  providers: [PremisesService],
  exports: [PremisesService],
})
export class PremisesModule {} 