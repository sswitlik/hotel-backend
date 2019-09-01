import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
  constructor(@InjectRepository(Client) repo) {
    super(repo);
  }
}
