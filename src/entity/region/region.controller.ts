import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RegionService } from './region.service';
import { Region } from './region.entity';

@Crud({
  model: {
    type: Region,
  },
})
@Controller('region')
export class RegionController {
  constructor(public service: RegionService) {
  }
}
