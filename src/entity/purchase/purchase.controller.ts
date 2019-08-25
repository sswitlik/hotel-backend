import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';

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
    },
  },
})
@Controller('purchase')
export class PurchaseController {
  constructor(public service: PurchaseService) {
  }
}
