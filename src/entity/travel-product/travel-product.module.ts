import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelProduct } from './travel-product.entity';
import { VacationController } from './vacation.controller';
import { VacationService } from './vacation.service';
import { Vacation } from './vacation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TravelProduct, Vacation])],
  controllers: [VacationController],
  providers: [VacationService],
  exports: [VacationService],
})
export class TravelProductModule {
}
