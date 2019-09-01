import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';
import { Type } from 'class-transformer';

export abstract class Person extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Type(() => Date)
  birthDate: string;
}
