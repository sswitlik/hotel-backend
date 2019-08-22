import { BaseEntity } from '../_base/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Room } from '../room/room.entity';
import { HotelLocation } from './_additionals/hotel-location.entity';
import { Vacation } from '../travel-product/vacation.entity';

@Entity()
export class Hotel extends BaseEntity {
  @Column('text')
  description: string;

  @OneToMany(type => Room, room => room.hotel, { cascade: true })
  rooms: Room[];

  @ManyToMany(type => HotelLocation, location => location.hotels)
  @JoinTable()
  locations: HotelLocation[];

  @ManyToMany(type => Vacation, vacation => vacation.hotels)
  vacations: Vacation[];
}
