import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { activePurchaseStatuses } from '../purchase/_additionals/purchase-status.enum';

@Injectable()
export class HotelService extends TypeOrmCrudService<Hotel> {
  constructor(@InjectRepository(Hotel) repo) {
    super(repo);
  }

  searchVacation(query: any) {
    const { from, to, pageSize, page } = query;

    if (!pageSize || !page) {
      throw new Error('Invalid pagination params');
    }

    if (!query.regions) {
      throw new Error('Invalid regions parameter');
    }
    const regions = query.regions.split(',');

    return this.repo.createQueryBuilder('hotel')
      .innerJoinAndSelect('hotel.region', 'region', 'region.name IN (:...regions)', { regions })
      .leftJoinAndSelect('hotel.rooms', 'room')
      .leftJoinAndSelect('room.purchases', 'purchase',
        'purchase.status IN (:...statuses) AND purchase.termTo > :now_date',
        { statuses: activePurchaseStatuses, now_date: new Date() })
      .skip(pageSize * page)
      .take(pageSize)
      .getMany();
  }
}
