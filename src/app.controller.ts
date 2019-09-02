import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { Roles, RolesGuard } from './modules/auth/roles.guard';
import { UserRole } from './modules/users/_additionals/user-role.enum';
import { UsersService } from './modules/users/users.service';
import { RequestQueryParser } from '@nestjsx/crud-request';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private usersService: UsersService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req) {
    console.log(req);
    return this.authService.login(await this.usersService.findByUsername(req.username));
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.GUEST)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test-parse')
  testParse(@Query() query) {
    console.log(query);
    console.log(typeof query);
    console.log('________');

    console.log(RequestQueryParser.create().parseQuery(query));
    console.log(RequestQueryParser.create().parseQuery(query).getParsed());

    return RequestQueryParser.create().parseQuery(query);
  }
}
