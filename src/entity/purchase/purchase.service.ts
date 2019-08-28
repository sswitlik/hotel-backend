import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Client } from '../client/client.entity';
import { Repository } from 'typeorm';
import { BuyProductInput } from './_additionals/buy-product-input.model';
import { RoomService } from '../room/room.service';
import { getWithDefault } from '../../modules/functions/get-with-default.function';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { Room } from '../room/room.entity';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo,
              @InjectRepository(Client) private clientRepo: Repository<Client>,
              private roomService: RoomService) {
    super(repo);
  }

  async buyProduct(input: BuyProductInput) {
    await this.validatePurchaseInput(input);

    let client = (await this.clientRepo.findByIds([getWithDefault(() => input.clientData.id)]))[0];
    if (!client) {
      client = await this.clientRepo.save(Object.assign(new Client(), input.clientData));
    }

    input.purchase.status = PurchaseStatus.RESERVED;
    input.purchase.client = client;
    const newlyPurchase = Object.assign(new Purchase(), input.purchase);
    await this.repo.save(newlyPurchase);

    return {
      purchase: newlyPurchase,
      clientData: client,
    };
  }

  private async validatePurchaseInput(input: BuyProductInput) {
    const purchase = input.purchase;

    const selectedRooms: Room[] = await this.roomService.getRoomsWithFuturePurchases(input.purchase.rooms.map(room => room.id));
    const roomsOk = !selectedRooms.some(room => {
      return room.purchases.some(roomPurchase => Purchase.isCollision(purchase, roomPurchase));
    });
    if (!roomsOk) {
      throw new Error('Validation: Room is not free in this term');
    }

    return selectedRooms;
  }
}
