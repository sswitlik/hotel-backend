import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Accomodation } from '../accomodation/accomodation.entity';
import { Hotel } from '../hotel/hotel.entity';

@Entity()
export class Region extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Accomodation, accomodation => accomodation.region)
  accomodations: Accomodation[];

  @OneToMany(type => Hotel, hotel => hotel.region)
  hotels: Hotel[];
}
