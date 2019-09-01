import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Region } from '../region/region.entity';
import { Vacation } from '../travel-product/vacation.entity';
import { IsDefined } from 'class-validator';

@Entity()
export class Accomodation extends BaseEntity {

  @IsDefined()
  @ManyToOne(type => Region, region => region.accomodations, { eager: true })
  region: Region;

  @ManyToOne(type => Vacation, product => product.accomodations)
  product: Vacation;
}
