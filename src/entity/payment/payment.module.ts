import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { Payment } from './payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Purchase } from '../purchase/purchase.entity';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  imports: [
    PurchaseModule,
    TypeOrmModule.forFeature([Payment, Purchase]),
    AuthModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {
}
