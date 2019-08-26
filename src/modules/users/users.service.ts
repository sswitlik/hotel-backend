import { Injectable } from '@nestjs/common';

export enum UserRole {
  ANONYMUS = 'ANONYMUS',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

export interface User {
  userId: number;
  username: string;
  password: string;
  roles: UserRole[];
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: [UserRole.ADMIN],
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        roles: [],
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        roles: [],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
