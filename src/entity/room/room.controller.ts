import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Room } from './room.entity';

@Crud({
  model: {
    type: Room,
  },
  query: {
    join: {
      hotel: {
        eager: true,
      },
      'hotel.region': {
        eager: true,
      },
    },
  },
})
@Controller('rooms')
export class RoomController {
}
