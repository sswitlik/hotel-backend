import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { PurchaseController } from '../purchase/purchase.controller';
import { PurchaseService } from '../purchase/purchase.service';
import { Payment } from './payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    AuthModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {
}
