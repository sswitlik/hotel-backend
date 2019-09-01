import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { Roles, RolesGuard } from './modules/auth/roles.guard';
import { UserRole } from './modules/users/_additionals/user-role.enum';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.GUEST)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
