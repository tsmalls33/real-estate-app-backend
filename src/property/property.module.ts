import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { CostModule } from '../cost/cost.module';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [PrismaModule, CostModule, ReservationModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
  exports: [PropertyService],
})
export class PropertyModule {}
