import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class Client extends BaseEntity {
  @Column({ nullable: true })
  address: string;

  @IsEmail({ allow_display_name: true }, { message: 'lol, zly mejl' })
  @Column({ nullable: true })
  email: string;

  @OneToMany(type => Purchase, purchase => purchase.client)
  purchases: Purchase[];

}
