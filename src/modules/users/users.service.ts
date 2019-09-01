import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClientService } from '../../entity/client/client.service';
import { UserRole } from './_additionals/user-role.enum';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

  constructor(@InjectRepository(User) repo: Repository<User>,
              private clientService: ClientService) {
    super(repo);
  }

  async registerUser(user: User) {
    await this.validateRegisterUser(user);

    user.role = UserRole.GUEST;
    return this.repo.save(user);
  }

  async registerEmployee(user: User) {
    await this.validateRegisterUser(user);

    user.role = UserRole.EMPLOYEE;
    delete user.client;
    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repo.createQueryBuilder('user')
      .where('user.username = :username', { username })
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
