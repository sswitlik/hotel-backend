import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';

export abstract class Person extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;
}
