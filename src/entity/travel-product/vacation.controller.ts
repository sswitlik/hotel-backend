import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { Vacation } from './vacation.entity';

@Crud({
  model: {
    type: Vacation,
  },
  query: {
    join: {
      accomodations: {
        eager: true,
      },
      'accomodations.region': {
        eager: true,
      },
    },
  },
})
@Controller('vacation')
export class VacationController {
  constructor(public service: VacationService) {
  }
}
