import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService extends TypeOrmCrudService<Room> {
  constructor(@InjectRepository(Room) repo) {
    super(repo);
  }

  async getRoomsWithFuturePurchases(ids: number[]) {
    return await this.repo.createQueryBuilder('room')
      .where('room.id IN :ids', { ids })
      .getMany();
  }
}
