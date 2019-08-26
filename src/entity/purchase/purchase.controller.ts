import { Crud } from '@nestjsx/crud';
import { Controller, Headers, Post, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/auth.service';
import { Roles } from '../../modules/auth/role.guard';
import { UserRole } from '../../modules/users/users.service';

@Crud({
  model: {
    type: Purchase,
  },
  query: {
    join: {
      hotels: {
        eager: true,
      },
      accomodations: {
        eager: true,
      },
      rooms: {
        eager: true,
      },
    },
  },
})
@Controller('purchase')
export class PurchaseController {
  constructor(public service: PurchaseService,
              private authService: AuthService) {
  }

  @Post('buy-product')
  @Roles(UserRole.ADMIN)
  buyProduct(@Req() req: Request, @Headers('authorization') bearer: string) {
    const mockPurchaseInput: Purchase = {
      // min 1; sum == participants
      rooms: [],
      // find
      product: null,
      termFrom: new Date(),
      termTo: new Date(),
      // findOrCreate
      client: null,
      // min 1;
      participants: [],
      // start: reservation
      status: '',
      id: undefined,
    };

    // console.log(this.authService.getUserRoles(bearer));
    // this.service.
  }
}
