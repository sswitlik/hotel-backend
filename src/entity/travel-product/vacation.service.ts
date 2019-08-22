import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacation } from './vacation.entity';

@Injectable()
export class VacationService extends TypeOrmCrudService<Vacation> {
  constructor(@InjectRepository(Vacation) repo) {
    super(repo);
  }
}
