import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../entity/_base/base.entity';
import { Role } from './_additionals/role.entity';
import { IsString } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column()
  password: string;

  @ManyToMany(type => Role, role => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];
}
