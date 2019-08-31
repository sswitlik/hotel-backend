import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService extends TypeOrmCrudService<Payment> {
  constructor(@InjectRepository(Payment) repo) {
    super(repo);
  }

  async registerPayment(payment: Payment) {

  }
}
