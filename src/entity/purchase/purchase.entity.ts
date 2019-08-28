import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Participant } from '../participant/participant.entity';
import { Client } from '../client/client.entity';
import { TravelProduct } from '../travel-product/travel-product.entity';
import { Room } from '../room/room.entity';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { ArrayMinSize, IsDate, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFutureValidator } from '../../modules/validators/is-future.validator';

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

  @ManyToOne(type => TravelProduct, product => product.purchases)
  @JoinTable()
  product: TravelProduct;

  @ArrayMinSize(1)
  @ManyToMany(type => Room, room => room.purchases)
  @JoinTable()
  rooms: Room[];
}
