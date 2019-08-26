import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Client extends BaseEntity {
  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(type => Purchase, purchase => purchase.client, { cascade: true })
  purchases: Purchase[];

}
