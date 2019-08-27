import { Purchase } from '../purchase.entity';
import { Client } from '../../client/client.entity';
import { Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TermPeriodValidator } from './term-period.validator';
import { AreRoomsInProductValidator } from './are-rooms-in-product.validator';

export class BuyProductInput_Purchase extends Purchase {

}

export class BuyProductInput_ClientData extends Client {
}

export class BuyProductInput {
  @ValidateNested()
  @Validate(TermPeriodValidator)
  @Validate(AreRoomsInProductValidator)
  @Type(() => BuyProductInput_Purchase)
  purchase: BuyProductInput_Purchase;

  @ValidateNested()
  @Type(() => BuyProductInput_ClientData)
  clientData: BuyProductInput_ClientData;
}
