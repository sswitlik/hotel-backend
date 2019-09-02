import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HotelService extends TypeOrmCrudService<Hotel> {
  constructor(@InjectRepository(Hotel) repo) {
    super(repo);
  }

  searchVacation(query: any) {
    const { from, to, pageSize, page } = query;

    if (!query.regions) {
      throw new Error('Invalid regions parameter');
    }
    const regions = query.regions.split(',');

    return this.repo.createQueryBuilder('hotel')
      .innerJoinAndSelect('hotel.region', 'region', 'region.name IN (:...regions)', { regions })
      .getMany();
  }
}
