import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region]),
    AuthModule,
  ],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {
}
