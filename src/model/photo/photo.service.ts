import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { PhotoMetadata } from './photo-metadata.entity';
import { Author } from './author.entity';
import { Album } from './album.entity';

@Injectable()
export class PhotoService {
  static counter = 0;

  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(PhotoMetadata)
    private photoMetadataRepository: Repository<PhotoMetadata>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {
  }

  findAll() {
    return this.photoRepository
      .createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .innerJoinAndSelect('photo.albums', 'albumsds')
      .getMany();
  }

  create() {
    let author, metadata, albums;
    this.authorRepository
      .find()
      .then(res => {
        author = res[0];
        return this.albumRepository.find();
      })
      .then(res => {
        albums = res;
      })
      .then(() => {
        const photo = Object.assign(new Photo(), {
          description: '',
          filename: '',
          isPublished: false,
          name: 'a',
          views: 0,
          author: author,
          albums: albums,
        });

        metadata = Object.assign(new PhotoMetadata(), {
          comment: '',
          photo: photo,
        });

        return this.photoRepository.save(photo);
      })
      .then(res => {
        return this.photoMetadataRepository.save(metadata);
      });
  }

  createAuthor() {
    this.authorRepository.save(
      Object.assign(new Author(), {
        name: 'author',
      }),
    );
  }

  createAlbum() {
    this.albumRepository.save(
      Object.assign(new Album(), {
        name: 'album' + PhotoService.counter++,
      }),
    );
  }
}
