import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Crud({
  model: {
    type: Client,
  },
  query: {
    join: {
      purchases: {
        eager: true,
      },
      purchaewses: {
        eager: true,
      },
    },
  },
})
@Controller('api/client')
export class ClientController {
  constructor(public service: ClientService) {
  }
}
