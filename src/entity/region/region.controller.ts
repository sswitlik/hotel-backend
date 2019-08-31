import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RegionService } from './region.service';
import { Region } from './region.entity';
import { IsUniqueGuard, UniquenessRepo } from '../../modules/validators/is-unique.guard';

@Crud({
  model: {
    type: Region,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(IsUniqueGuard),
        UniquenessRepo({ entity: Region, property: 'name' }),
      ],
    },
  },
})
@Controller('region')
export class RegionController {
  constructor(public service: RegionService) {
  }
}
