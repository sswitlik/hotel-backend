import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';
import { Type } from 'class-transformer';

export abstract class Person extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Type(() => Date)
  birthDate: string;
}
