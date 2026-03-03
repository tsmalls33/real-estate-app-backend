import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { PropertyStatsService } from './property-stats.service';
import { PropertyStatsRepository } from './property-stats.repository';
import { CostModule } from '../cost/cost.module';

@Module({
  imports: [PrismaModule, CostModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, PropertyStatsService, PropertyStatsRepository],
  exports: [PropertyService],
})
export class PropertyModule {}
