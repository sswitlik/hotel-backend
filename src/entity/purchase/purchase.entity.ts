import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Participant } from '../participant/participant.entity';
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { ArrayMinSize, IsDate, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFutureValidator } from '../../modules/validators/is-future.validator';
import { Vacation } from '../travel-product/vacation.entity';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Purchase extends BaseEntity {

  static isCollision(purchase1: Purchase, purchase2: Purchase) {
    return !(purchase1.termFrom > purchase2.termTo || purchase1.termTo < purchase2.termFrom);
  }

  @ArrayMinSize(1)
  @OneToMany(type => Participant, participant => participant.purchase, { cascade: true })
  participants: Participant[];

  @IsDate()
  @Validate(IsFutureValidator)
  @Type(() => Date)
  @Column({ nullable: true })
  termFrom: Date;

  @IsDate()
  @Validate(IsFutureValidator)
  @Type(() => Date)
  @Column({ nullable: true })
  termTo: Date;

  @Column()
  status: PurchaseStatus;

  @ManyToOne(type => Client, client => client.purchases, { cascade: true })
  client: Client;

  @ManyToOne(type => Vacation, product => product.purchases)
  @JoinTable()
  product: Vacation;

  @ArrayMinSize(1)
  @ManyToMany(type => Room, room => room.purchases)
  @JoinTable()
  rooms: Room[];

  @OneToMany(type => Payment, payment => payment.purchase)
  payments: Payment[];
}
