import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entity/_base/base.entity';
import { DictionaryItem } from './dictionary-item.entity';

@Entity()
export class Dictionary extends BaseEntity {

  @Column()
  name: string;

  @OneToMany(type => DictionaryItem, item => item.dictionary)
  items: DictionaryItem[];
}
