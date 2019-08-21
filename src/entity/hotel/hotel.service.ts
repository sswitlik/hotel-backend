import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HotelService extends TypeOrmCrudService<Hotel> {
  constructor(@InjectRepository(Hotel) repo) {
    super(repo);
  }
}
