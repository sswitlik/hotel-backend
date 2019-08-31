import { Region } from './region.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionService extends TypeOrmCrudService<Region> {
  constructor(@InjectRepository(Region) repo) {
    super(repo);
  }

}
