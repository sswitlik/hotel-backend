import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { AuthModule } from '../../modules/auth/auth.module';
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Client, Room]),
    AuthModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {
}
