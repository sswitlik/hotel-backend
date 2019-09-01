import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entity/_base/base.entity';
import { Dictionary } from './dictionary.entity';

@Entity()
export class DictionaryItem extends BaseEntity {
  @Column()
  code: string;

  @ManyToOne(type => Dictionary, dictionary => dictionary.items)
  dictionary: Dictionary;
}
