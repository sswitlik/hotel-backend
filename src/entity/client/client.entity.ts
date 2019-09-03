import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { IsEmail } from 'class-validator';
import { User } from '../../modules/users/user.entity';
import { Person } from '../_base/person.entity';

@Entity()
export class Client extends Person {
  @Column({ nullable: true })
  address: string;

  @IsEmail({ allow_display_name: true })
  @Column({ nullable: true })
  email: string;

  @OneToMany(type => Purchase, purchase => purchase.client)
  purchases: Purchase[];

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
