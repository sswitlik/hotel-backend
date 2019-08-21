import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hotel } from '../hotel/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TravelProductService extends TypeOrmCrudService<Hotel> {
  constructor(@InjectRepository(Hotel) repo) {
    super(repo);
  }
}
