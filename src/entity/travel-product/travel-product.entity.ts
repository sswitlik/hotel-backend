import { BaseEntity } from '../_base/base.entity';
import { Entity, OneToMany, TableInheritance } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class TravelProduct extends BaseEntity {
  @OneToMany(type => Purchase, purchase => purchase.product)
  purchases: Purchase[];
}
