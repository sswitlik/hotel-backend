import { Controller } from '@nestjs/common';
import { Purchase } from '../purchase/purchase.entity';
import { PurchaseService } from '../purchase/purchase.service';
import { Crud } from '@nestjsx/crud';

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
@Controller()
export class PaymentController {
  constructor(public service: PurchaseService) {
  }

}
