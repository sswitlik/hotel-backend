import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './_additionals/role.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClientService } from '../../entity/client/client.service';

export enum UserRole {
  ANONYMUS = 'ANONYMUS',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

  constructor(@InjectRepository(User) repo: Repository<User>,
              private clientService: ClientService) {
    super(repo);
  }

  async registerUser(user: User) {
    await this.validateRegisterUser(user);

    user.roles = [Role.instance<Role>({ name: UserRole.GUEST })];
    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repo.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.roles', 'role')
      .getOne();
  }

  private async validateRegisterUser(user: User) {
    const userWithSameUsername = await this.repo.createQueryBuilder('user')
      .where('user.username = :username', { username: user.username })
      .getOne();
    if (userWithSameUsername) {
      throw new Error('username already in use');
    }
  }
}
