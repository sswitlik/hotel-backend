import { Injectable } from '@nestjs/common';
import { UserRole, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getUserRoles(token: string): UserRole[] {
    if (!token) {
      return [];
    }
    const bearer = token.startsWith('Bearer') ? token.substring(7) : token;
    return (this.jwtService.decode(bearer) as any).roles;
  }
}
