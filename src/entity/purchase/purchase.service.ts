import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Client } from '../client/client.entity';
import { Repository } from 'typeorm';
import { getWithDefault } from '../../modules/functions/get-with-default.function';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { BuyProductInput } from './_additionals/buy-product-input.model';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo,
              @InjectRepository(Client) private clientRepo: Repository<Client>) {
    super(repo);
  }

  async buyProduct(input: BuyProductInput) {
    this.validatePurchaseInput(input);

    let client = (await this.clientRepo.findByIds([getWithDefault(() => input.clientData.id)]))[0];
    if (!client) {
      client = await this.clientRepo.save(Object.assign(new Client(), input.clientData));
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

  private validatePurchaseInput(input: BuyProductInput) {
    const purchase = input.purchase;
    // if (getWithDefault(() => purchase.participants.length) < 1) {
    //   throw new Error('Must be at least one participant');
    // }
  }
}
