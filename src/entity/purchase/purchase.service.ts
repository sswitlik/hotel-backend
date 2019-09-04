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
import { Vacation } from '../travel-product/vacation.entity';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(@InjectRepository(Purchase) repo,
              @InjectRepository(Client) private clientRepo: Repository<Client>,
              @InjectRepository(Vacation) private vacationRepo: Repository<Vacation>,
              private roomService: RoomService) {
    super(repo);
  }

  async buyProduct(input: BuyProductInput) {
    input.purchase.product = await this.vacationRepo.findOne(input.purchase.product.id);
    input.purchase.rooms = await this.roomService.getRoomsWithFuturePurchases(input.purchase.rooms.map(room => room.id));
    input.purchase.termFrom = new Date(input.purchase.termFrom);
    input.purchase.termTo = new Date(input.purchase.termTo);
    // return input;

    await this.validatePurchaseInput(input);

    let client = (await this.clientRepo.findByIds([getWithDefault(() => input.clientData.id)]))[0];
    if (!client) {
      client = await this.clientRepo.save(Object.assign(new Client(), input.clientData));
    }

    input.purchase.status = PurchaseStatus.RESERVED;
    input.purchase.client = client;
    const newlyPurchase = Object.assign(new Purchase(), input.purchase);
    newlyPurchase.price = input.purchase.rooms
      .reduce((previousValue, currentValue) => previousValue + Number(currentValue.pricePerDay), 0)
      .toFixed(2);

    await this.repo.save(newlyPurchase);

    return {
      purchase: newlyPurchase,
      clientData: client,
    };
  }

  getPurchaseWithPayments(id: number) {
    return this.repo.createQueryBuilder('purchase')
      .where('purchase.id = :id', { id })
      .leftJoinAndSelect('purchase.payments', 'payment')
      .getOne();
  }

  async setPurchaseToPaid(purchase: Purchase) {
    return this.changePurchaseStatus(purchase, PurchaseStatus.RESERVED, PurchaseStatus.PAID);
  }

  async setPurchaseToResigned(purchase: Purchase) {
    return this.changePurchaseStatus(purchase, PurchaseStatus.RESERVED, PurchaseStatus.RESIGNED);
  }

  async setPurchaseToCancelled(purchase: Purchase) {
    return this.changePurchaseStatus(purchase, PurchaseStatus.PAID, PurchaseStatus.CANCELLED);
  }

  _getOne(id: number): Promise<Purchase> {
    return this.repo.findOne(id);
  }

  private async validatePurchaseInput(input: BuyProductInput) {
    const purchase = input.purchase;
    const product = purchase.product;
    const participants = purchase.participants;
    const rooms = purchase.rooms;

    const roomsOk = !rooms.some(room => {
      return room.purchases.some(roomPurchase => {
        if (Purchase.isCollision(purchase, roomPurchase)) {
          throw new Error(`Validation: Room is not free in this term: ${roomPurchase}`);
        }
        return Purchase.isCollision(purchase, roomPurchase);
      });

    });

    if (!rooms.every(room => room.hotel.region.id === product.accomodations[0].region.id)) {
      throw new Error('Validation: Each room must be in hotel of selected region');
    }

    // should check in all hotel rooms
    // const sum = rooms.reduce((prev, curr) => prev + curr.personNumber, 0);
    // if (!(sum >= participants.length)) {
    //   throw new Error(`Validation: Sum of rooms space (${sum}) must grater or equal than number of participants (${participants.length})`);
    // }
  }

  private async changePurchaseStatus(purchase: Purchase, from: PurchaseStatus, to: PurchaseStatus) {
    let result = purchase;
    if (purchase.status === from) {
      purchase.status = to;
      result = await this.repo.save(purchase);
    }
    return result;

  }
}
