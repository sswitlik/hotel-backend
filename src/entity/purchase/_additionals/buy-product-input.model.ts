import { Purchase } from '../purchase.entity';
import { Client } from '../../client/client.entity';
import { Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TermPeriodValidator } from './term-period.validator';

export class BuyProductInput {
  @ValidateNested()
  @Validate(TermPeriodValidator)
  // @Validate(AreRoomsInProductValidator)
  // @Validate(IsEnoughSpaceForParticipantsValidator)
  @Type(() => Purchase)
  purchase: Purchase;

  @ValidateNested()
  @Type(() => Client)
  clientData: Client;
}
