import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Hotel } from '../hotel/hotel.entity';
import { RoomEquipment } from './_additionals/room-equipment.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  personNumber: number;

  @ManyToOne(type => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @ManyToMany(type => RoomEquipment, equipment => equipment.rooms)
  @JoinTable()
  equipment: RoomEquipment[];

  @ManyToMany(type => Purchase, purchase => purchase.rooms)
  purchases: Purchase[];
}
