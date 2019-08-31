import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { AuthModule } from '../../modules/auth/auth.module';
import { Client } from '../client/client.entity';
import { RoomModule } from '../room/room.module';
import { Vacation } from '../travel-product/vacation.entity';

@Module({
  imports: [
    RoomModule,
    TypeOrmModule.forFeature([Purchase, Client, Vacation]),
    AuthModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {
}
