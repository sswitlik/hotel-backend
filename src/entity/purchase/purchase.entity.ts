import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Participant } from '../participant/participant.entity';
import { DictionaryValue } from '../../modules/dictionary/dictionary-value.type';
import { Client } from '../client/client.entity';
import { TravelProduct } from '../travel-product/travel-product.entity';

@Entity()
export class Purchase extends BaseEntity {
  @OneToMany(type => Participant, participant => participant.purchase)
  participants: Participant[];

  @Column()
  termFrom: Date;

  @Column()
  termTo: Date;

  @Column()
  status: DictionaryValue;

  @ManyToOne(type => Client, client => client.purchases)
  client: Client;

  @ManyToOne(type => TravelProduct, product => product.purchases)
  product: TravelProduct;

}
