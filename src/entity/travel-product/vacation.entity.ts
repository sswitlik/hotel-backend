import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { TravelProduct } from './travel-product.entity';
import { Hotel } from '../hotel/hotel.entity';

@ChildEntity()
export class Vacation extends TravelProduct {
  @ManyToMany(type => Hotel, hotel => hotel.vacations)
  @JoinTable()
  hotels: Hotel[];
}
