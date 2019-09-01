import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { Repository } from 'typeorm';
import { PurchaseService } from '../purchase/purchase.service';
import * as _ from 'lodash';

@Injectable()
export class PaymentService extends TypeOrmCrudService<Payment> {
  constructor(@InjectRepository(Payment) repo,
              @InjectRepository(Purchase) private purchaseRepo: Repository<Purchase>,
              private purchaseService: PurchaseService) {
    super(repo);
  }

  async registerPayment(payment: Payment) {
    payment.purchase = await this.purchaseService.getPurchaseWithPayments(payment.purchase.id);

    const paymentsSum = Purchase.paymentsSum(payment.purchase) + Number(payment.quantity);
    if (paymentsSum >= Number(payment.purchase.price)) {
      payment.purchase = await this.purchaseService.setPurchaseToPaid(payment.purchase);
    }

    const jsonPayment = _.clone(payment);
    delete jsonPayment.purchase;
    payment.purchase.payments.push(jsonPayment);
    return this.repo.save(payment);
  }
}
