import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { activePurchaseStatuses } from '../purchase/_additionals/purchase-status.enum';

@Injectable()
export class RoomService extends TypeOrmCrudService<Room> {
  constructor(@InjectRepository(Room) repo: Repository<Room>) {
    super(repo);
  }

  async getRoomsWithFuturePurchases(ids: number[]): Promise<Room[]> {
    return this.repo.createQueryBuilder('room')
      .where('room.id IN (:...ids)', { ids })
      .leftJoinAndSelect('room.purchases', 'purchase',
        'purchase.status IN (:...statuses) AND purchase.termTo > :now_date',
        { statuses: activePurchaseStatuses, now_date: new Date() })
      .leftJoinAndSelect('room.hotel', 'hotel')
      .leftJoinAndSelect('hotel.region', 'region')
      .getMany();
  }
}
