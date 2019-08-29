import { Entity, OneToMany } from 'typeorm';
import { TravelProduct } from './travel-product.entity';
import { Purchase } from '../purchase/purchase.entity';
import { Accomodation } from '../accomodation/accomodation.entity';

@Entity()
export class Vacation extends TravelProduct {
  @OneToMany(type => Purchase, purchase => purchase.product)
  purchases: Purchase[];

  @OneToMany(type => Accomodation, accomodation => accomodation.product, { cascade: true })
  accomodations: Accomodation[];
}
