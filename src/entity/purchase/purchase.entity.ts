import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Participant } from '../participant/participant.entity';
import { Client } from '../client/client.entity';
import { TravelProduct } from '../travel-product/travel-product.entity';
import { Room } from '../room/room.entity';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { ArrayMinSize, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Purchase extends BaseEntity {

  @ArrayMinSize(1)
  @OneToMany(type => Participant, participant => participant.purchase, { cascade: true })
  participants: Participant[];

  @IsDate()
  @Type(() => Date)
  @Column({ nullable: true })
  termFrom: Date;

  @IsDate()
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
