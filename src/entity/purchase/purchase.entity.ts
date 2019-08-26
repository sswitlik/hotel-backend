import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Participant } from '../participant/participant.entity';
import { Client } from '../client/client.entity';
import { TravelProduct } from '../travel-product/travel-product.entity';
import { Room } from '../room/room.entity';
import { PurchaseStatus } from '../../../dist/entity/purchase/purchase-status.enum';

@Entity()
export class Purchase extends BaseEntity {
  @OneToMany(type => Participant, participant => participant.purchase)
  participants: Participant[];

  @Column({ nullable: true })
  termFrom: Date;

  @Column({ nullable: true })
  termTo: Date;

  @Column()
  status: PurchaseStatus;

  @ManyToOne(type => Client, client => client.purchases)
  client: Client;

  @ManyToOne(type => TravelProduct, product => product.purchases)
  @JoinTable()
  product: TravelProduct;

  @ManyToMany(type => Room, room => room.purchases)
  @JoinTable()
  rooms: Room[];
}
