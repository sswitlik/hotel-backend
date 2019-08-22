import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Region } from '../region/region.entity';
import { TravelProduct } from '../travel-product/travel-product.entity';

@Entity()
export class Accomodation extends BaseEntity {

  @ManyToOne(type => Region, region => region.accomodations, { cascade: true })
  region: Region;

  @ManyToOne(type => TravelProduct, product => product.accomodations)
  product: TravelProduct;
}
