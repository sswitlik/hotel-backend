import { HotelService } from './hotel.service';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Hotel } from './hotel.entity';
import { Roles, RolesGuard } from '../../modules/auth/roles.guard';
import { EmployeeAndMore } from '../../modules/users/_additionals/user-role.enum';

@Crud({
  model: {
    type: Hotel,
  },
  query: {
    join: {
      rooms: {
        eager: true,
      },
      region: {
        eager: true,
      },
    },
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(RolesGuard),
        Roles(...EmployeeAndMore()),
      ],
    },
  },
})
@Controller('hotel')
export class HotelController {
  constructor(public service: HotelService) {
  }
}
