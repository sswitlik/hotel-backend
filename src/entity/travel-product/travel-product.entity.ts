import { BaseEntity } from '../_base/base.entity';
import { Entity, OneToMany, TableInheritance } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { Accomodation } from '../accomodation/accomodation.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class TravelProduct extends BaseEntity {
  @OneToMany(type => Purchase, purchase => purchase.product)
  purchases: Purchase[];

  @OneToMany(type => Accomodation, accomodation => accomodation.product, { cascade: true })
  accomodations: Accomodation[];
}
