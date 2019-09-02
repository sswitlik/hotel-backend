import { HotelService } from './hotel.service';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Hotel } from './hotel.entity';
import { Roles, RolesGuard } from '../../modules/auth/roles.guard';
import { EmployeeAndMore } from '../../modules/users/_additionals/user-role.enum';
import { IsUniqueGuard, UniquenessRepo } from '../../modules/validators/is-unique.guard';
import { ResponseModel } from '../../modules/response/response.model';

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
      'region.accomodations': {},
      'rooms.purchases': {},
    },
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(RolesGuard, IsUniqueGuard),
        Roles(...EmployeeAndMore()),
        UniquenessRepo({ entity: Hotel, property: 'name' }),
      ],
    },
  },
})
@Controller('api/hotel')
export class HotelController {
  constructor(public service: HotelService) {
  }

  @Get('search')
  async search(@Query() query: any, @Res() res) {
    return ResponseModel.tryCatch(res, () => this.service.searchVacation(query));
  }
}

