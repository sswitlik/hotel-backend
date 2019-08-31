import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelModule } from './entity/hotel/hotel.module';
import { TravelProductModule } from './entity/travel-product/travel-product.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PurchaseModule } from './entity/purchase/purchase.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './modules/auth/roles.guard';
import { ClientModule } from './entity/client/client.module';
import { PaymentModule } from './entity/payment/payment.module';
import { RegionModule } from './entity/region/region.module';

@Module({
  imports: [
    RegionModule,
    PaymentModule,
    UsersModule,
    PurchaseModule,
    AuthModule,
    HotelModule,
    TravelProductModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'hotels',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
}
