import { BaseEntity } from '../_base/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Room } from '../room/room.entity';
import { HotelLocation } from './_additionals/hotel-location.entity';
import { Region } from '../region/region.entity';
import { ArrayMinSize, IsDefined, IsString } from 'class-validator';

@Entity()
export class Hotel extends BaseEntity {
  @IsString()
  @Column()
  name: string;

  @Column('text')
  description: string;

  @ArrayMinSize(1)
  @OneToMany(type => Room, room => room.hotel, { cascade: true })
  rooms: Room[];

  @ManyToMany(type => HotelLocation, location => location.hotels)
  @JoinTable()
  locations: HotelLocation[];

  @IsDefined()
  @ManyToOne(type => Region, region => region.hotels)
  region: Region;
}
