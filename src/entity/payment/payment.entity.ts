import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';
import { IsCurrency } from 'class-validator';

@Entity()
export class Payment extends BaseEntity {

  @ManyToOne(type => Purchase, purchase => purchase.payments)
  purchase: Purchase;

  @IsCurrency()
  @Column()
  quantity: number;

}
