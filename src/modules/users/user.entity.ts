import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../entity/_base/base.entity';
import { IsString, ValidateNested } from 'class-validator';
import { Client } from '../../entity/client/client.entity';
import { Type } from 'class-transformer';
import { UserRole } from './_additionals/user-role.enum';

@Entity()
export class User extends BaseEntity {
  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column()
  password: string;

  @Column()
  role: UserRole;

  @ValidateNested()
  @Type(type => Client)
  @OneToOne(type => Client, client => client.user, { cascade: true })
  client: Client;
}
