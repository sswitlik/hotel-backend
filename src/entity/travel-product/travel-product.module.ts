import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationController } from './vacation.controller';
import { VacationService } from './vacation.service';
import { Vacation } from './vacation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation])],
  controllers: [VacationController],
  providers: [VacationService],
  exports: [VacationService],
})
export class TravelProductModule {
}
