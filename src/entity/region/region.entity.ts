import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Accomodation } from '../accomodation/accomodation.entity';

@Entity()
export class Region extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Accomodation, accomodation => accomodation.region)
  accomodations: Accomodation[];
}
