import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { TravelProduct } from './travel-product.entity';
import { TravelProductService } from './travel-product.service';

@Crud({
  model: {
    type: TravelProduct,
  },
  query: {
    join: {
      rooms: {
        eager: true,
      },
    },
  },
})
@Controller('hotel')
export class TravelProductController {
  constructor(public service: TravelProductService) {
  }
}
