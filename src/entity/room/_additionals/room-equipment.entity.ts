import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../_base/base.entity';
import { Room } from '../room.entity';

@Entity()
export class RoomEquipment extends BaseEntity {

  @Column()
  name: string;

  @ManyToMany(type => Room, room => room.equipment)
  rooms: Room[];
}
