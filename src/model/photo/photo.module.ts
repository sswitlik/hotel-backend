import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoMetadata } from './photo-metadata.entity';
import { Author } from './author.entity';
import { Album } from './album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoMetadata, Author, Album])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {
}
