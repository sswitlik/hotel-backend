import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../_base/base.entity';
import { Hotel } from '../hotel.entity';

@Entity()
export class HotelLocation extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(type => Hotel, hotel => hotel.locations)
  hotels: Hotel[];
}
