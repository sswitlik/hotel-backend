import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService extends TypeOrmCrudService<Payment> {
  constructor(@InjectRepository(Payment) repo,
              @InjectRepository(Purchase) private purchaseRepo: Repository<Purchase>) {
    super(repo);
  }

  async registerPayment(payment: Payment) {
    const purchase = await this.purchaseRepo.findOne(payment.purchase.id);
    console.log(purchase);
    return purchase;
  }
}
