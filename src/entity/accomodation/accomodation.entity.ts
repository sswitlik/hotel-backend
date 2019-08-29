import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Region } from '../region/region.entity';
import { Vacation } from '../travel-product/vacation.entity';

@Entity()
export class Accomodation extends BaseEntity {

  @ManyToOne(type => Region, region => region.accomodations, { cascade: true })
  region: Region;

  @ManyToOne(type => Vacation, product => product.accomodations)
  product: Vacation;
}
