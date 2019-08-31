import { Entity, OneToMany } from 'typeorm';
import { TravelProduct } from './travel-product.entity';
import { Purchase } from '../purchase/purchase.entity';
import { Accomodation } from '../accomodation/accomodation.entity';
import { ArrayMinSize } from 'class-validator';

@Entity()
export class Vacation extends TravelProduct {
  @OneToMany(type => Purchase, purchase => purchase.product)
  purchases: Purchase[];

  @ArrayMinSize(1)
  @OneToMany(type => Accomodation, accomodation => accomodation.product, { cascade: true, eager: true })
  accomodations: Accomodation[];
}
