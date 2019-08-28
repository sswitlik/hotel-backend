import { Crud } from '@nestjsx/crud';
import { Body, Controller, Headers, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { BuyProductInput } from './_additionals/buy-product-input.model';
import { PurchaseStatus } from './_additionals/purchase-status.enum';
import { Response } from 'express';
import { ResponseModel } from '../../modules/response/response.model';

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
  constructor(public service: PurchaseService) {
  }

  @Post('buy-product')
  @UsePipes(ValidationPipe)
  async buyProduct(@Body() body: BuyProductInput, @Headers('authorization') bearer: string, @Res() res: Response) {
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
        status: PurchaseStatus.RESERVED,
        id: undefined,
      },
    };

    try {
      res.send(await this.service.buyProduct(body));
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(ResponseModel.BadRequestResponse(e.message));
    }
  }
}
