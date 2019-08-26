import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Client } from '../client/client.entity';
import { Repository } from 'typeorm';
import { PurchaseStatus } from '../../../dist/entity/purchase/_additionals/purchase-status.enum';
import { BuyProductInput } from '../../../dist/entity/purchase/_additionals/buy-product-input.model';
import { getWithDefault } from '../../modules/functions/get-with-default.function';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo,
              @InjectRepository(Client) private clientRepo: Repository<Client>) {
    super(repo);
  }

  async buyProduct(input: BuyProductInput) {
    // this.validatePurchaseInput(purchase)
    let client = (await this.clientRepo.findByIds([getWithDefault(() => input.clientData.id)]))[0];
    if (!client) {
      client = await this.clientRepo.save(new Client());
      console.log('new client');
    }

    input.purchase.status = PurchaseStatus.RESERVED;
    input.purchase.client = client;
    const newlyPurchase = Object.assign(new Purchase(), input.purchase);
    await this.repo.save(newlyPurchase);
    // console.log(newlyPurchase);

    return {
      purchase: newlyPurchase,
      clientData: client,
    };
  }
}
