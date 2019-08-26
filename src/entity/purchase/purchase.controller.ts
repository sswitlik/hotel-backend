import { Crud } from '@nestjsx/crud';
import { Controller, Headers, Post, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/auth.service';
import { BuyProductInput } from '../../../dist/entity/purchase/_additionals/buy-product-input.model';

@Crud({
  model: {
    type: Purchase,
  },
  query: {
    join: {
      accomodations: {
        eager: true,
      },
      rooms: {
        eager: true,
      },
      product: {
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
  buyProduct(@Req() request: Request, @Headers('authorization') bearer: string) {
    const mockPurchaseInput: BuyProductInput = {
      clientData: null,
      purchase: {
        // min 1; sum == participants; must be in product
        rooms: [],
        product: null,
        // must be free space in term
        termFrom: new Date(),
        termTo: new Date(),
        // findOrCreate
        client: null,
        // min 1;
        participants: [],
        // start: reservation
        status: '',
        id: undefined,
      },
    };

    console.log(request.body);
    return this.service.buyProduct(request.body);
  }
}
