import { HotelService } from './hotel.service';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Hotel } from './hotel.entity';

@Crud({
  model: {
    type: Hotel,
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
export class HotelController {
  constructor(public service: HotelService) {
  }
}
