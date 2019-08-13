import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoMetadata } from './photo-metadata.entity';
import { Author } from './author.entity';
import { Album } from './album.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)
  metadata: PhotoMetadata;

  @ManyToOne(type => Author, author => author.photos)
  author: Author;

  @ManyToMany(type => Album, album => album.photos)
  @JoinTable()
  albums: Album[];
}
