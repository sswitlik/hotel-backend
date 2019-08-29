import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../entity/_base/base.entity';
import { User } from '../user.entity';
import { UserRole } from '../users.service';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: UserRole;

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
