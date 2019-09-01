import { Body, Controller, Post } from '@nestjs/common';
import { Purchase } from '../purchase/purchase.entity';
import { Crud } from '@nestjsx/crud';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { Roles } from '../../modules/auth/roles.guard';
import { UserRole } from '../../modules/users/_additionals/user-role.enum';

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
  @Roles(UserRole.GUEST, UserRole.ANONYMUS)
  registerPayment(@Body() body: Payment) {
    return this.service.registerPayment(body);
  }
}
