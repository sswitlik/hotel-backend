import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelModule } from './entity/hotel/hotel.module';
import { TravelProductModule } from './entity/travel-product/travel-product.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PurchaseModule } from './entity/purchase/purchase.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/role.guard';

@Module({
  imports: [
    UsersModule,
    PurchaseModule,
    AuthModule,
    HotelModule,
    TravelProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
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
  ],
})
export class AppModule {
}
