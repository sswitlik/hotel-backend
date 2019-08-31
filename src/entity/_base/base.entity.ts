import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {

  static instance<T extends BaseEntity>(source: Partial<T>): T {
    console.log(123);
    return Object.assign(new this(), source) as T;
  }

  @PrimaryGeneratedColumn()
  id: number;
}
