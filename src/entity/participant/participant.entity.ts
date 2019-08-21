import { Column, Entity, ManyToOne } from 'typeorm';
import { Person } from '../_base/person.entity';
import { DictionaryValue } from '../../modules/dictionary/dictionary-value.type';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Participant extends Person {
  @Column()
  sex: DictionaryValue;

  @ManyToOne(type => Purchase, purchase => purchase.participants)
  purchase: Purchase;
}
