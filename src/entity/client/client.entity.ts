import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  address: string;

  @Column()
  email: string;

  @OneToMany(type => Purchase, purchase => purchase.client)
  purchases: Purchase[];

}
