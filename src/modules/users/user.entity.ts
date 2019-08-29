import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../entity/_base/base.entity';
import { Role } from './_additionals/role.entity';
import { IsString, ValidateNested } from 'class-validator';
import { Client } from '../../entity/client/client.entity';
import { Type } from 'class-transformer';

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

  @ValidateNested()
  @Type(type => Client)
  @OneToOne(type => Client, client => client.user, { cascade: true })
  client: Client;
}
