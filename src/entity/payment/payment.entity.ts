import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Payment extends BaseEntity {

  @ManyToOne(type => Purchase, purchase => purchase.payments)
  purchase: Purchase;
}
