import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Client } from '../client/client.entity';
import { Repository } from 'typeorm';
import { PurchaseStatus } from '../../../dist/entity/purchase/_additionals/purchase-status.enum';
import { BuyProductInput } from '../../../dist/entity/purchase/_additionals/buy-product-input.model';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo,
              @InjectRepository(Client) private clientRepo: Repository<Client>) {
    super(repo);
  }

  async buyProduct(input: BuyProductInput) {
    // this.validatePurchaseInput(purchase)
    input.purchase.status = PurchaseStatus.RESERVED;
    const newlyPurchase = await this.clientRepo.save(input.purchase);
    console.log(newlyPurchase);
    if (!input.clientData) {
      const client = await this.clientRepo.save({ purchases: [newlyPurchase] });
      console.log(client);
    }
  }
}
