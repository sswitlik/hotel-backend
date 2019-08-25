import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo) {
    super(repo);
  }
}
