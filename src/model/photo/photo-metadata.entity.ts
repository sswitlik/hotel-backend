import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @OneToOne(type => Photo, 'metadata')
  @JoinColumn()
  photo: Photo;
}
