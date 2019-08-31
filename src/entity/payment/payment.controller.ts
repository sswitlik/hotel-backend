import { Body, Controller, Post } from '@nestjs/common';
import { Purchase } from '../purchase/purchase.entity';
import { Crud } from '@nestjsx/crud';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';

@Crud({
  model: {
    type: Purchase,
  },
  query: {
    join: {
      accomodations: {
        eager: true,
      },
      rooms: {
        eager: true,
      },
      product: {
        eager: true,
      },
    },
  },
})
@Controller('payment')
export class PaymentController {
  constructor(public service: PaymentService) {
  }

  @Post('register-payment')
  registerPayment(@Body() body: Payment) {
    this.service.registerPayment(body);
  }
}
