import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Purchase } from '../purchase/purchase.entity';
import { IsEmail } from 'class-validator';
import { User } from '../../modules/users/user.entity';

@Entity()
export class Client extends BaseEntity {
  @Column({ nullable: true })
  address: string;

  @IsEmail({ allow_display_name: true }, { message: 'lol, zly mejl' })
  @Column({ nullable: true })
  email: string;

  @OneToMany(type => Purchase, purchase => purchase.client)
  purchases: Purchase[];

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
