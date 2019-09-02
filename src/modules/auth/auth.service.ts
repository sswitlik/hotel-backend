import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/_additionals/user-role.enum';

interface Payload {
  username: string;
  sub: any;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: Payload = { username: user.username, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.slign(payload),
    };
  }

  getUserRoles(token: string): UserRole {
    if (!token) {
      return null;
    }
    const bearer = token.startsWith('Bearer') ? token.substring(7) : token;
    return (this.jwtService.decode(bearer) as Payload).role;
  }
}
