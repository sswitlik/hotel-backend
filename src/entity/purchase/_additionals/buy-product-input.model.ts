import { Purchase } from '../purchase.entity';

export interface BuyProductInput {
  purchase: Purchase;
  clientData: any;
}
