import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {
  }

  @Get()
  getAll() {
    return this.photoService.findAll();
  }

  @Get('create')
  create() {
    this.photoService.create();
  }

  @Get('create-author')
  createAuthor() {
    this.photoService.createAuthor();
  }

  @Get('create-album')
  createAlbum() {
    this.photoService.createAlbum();
  }
}
