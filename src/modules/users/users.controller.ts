import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Response } from 'express';
import { ResponseModel } from '../response/response.model';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      roles: {
        eager: true,
      },
    },
  },
})
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post('register')
  async registerUser(@Body() body: User, @Res() res: Response) {
    try {
      res.send(await this.service.registerUser(body));
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(ResponseModel.BadRequestResponse(e.message));
    }
  }
}
