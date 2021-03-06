import { Body, Controller, Post, Res } from '@nestjs/common';
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
      client: {},
    },
  },
})
@Controller('api/users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post('register')
  // TODO: activation link: Requirement 1.5
  async registerUser(@Body() body: User, @Res() res: Response) {
    ResponseModel.tryCatch(res, () => this.service.registerUser(body));
  }

  @Post('register-employee')
  async registerEmployee(@Body() body: User, @Res() res: Response) {
    ResponseModel.tryCatch(res, () => this.service.registerEmployee(body));
  }
}
