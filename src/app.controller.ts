import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { Roles, RolesGuard } from './modules/auth/roles.guard';
import { UserRole } from './modules/users/_additionals/user-role.enum';
import { UsersService } from './modules/users/users.service';
import { RequestQueryParser } from '@nestjsx/crud-request';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entity/region/region.entity';
import { Repository } from 'typeorm';
import { Vacation } from './entity/travel-product/vacation.entity';
import { Hotel } from './entity/hotel/hotel.entity';
import { Accomodation } from './entity/accomodation/accomodation.entity';
import { Room } from './entity/room/room.entity';
import { User } from './modules/users/user.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private usersService: UsersService,
              @InjectRepository(Region) private regionRepo: Repository<Region>,
              @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
              @InjectRepository(Vacation) private vacationRepo: Repository<Vacation>) {
    this.initDB();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req) {
    return this.authService.login(await this.usersService.findByUsername(req.username));
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.GUEST)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test-parse')
  testParse(@Query() query) {
    return RequestQueryParser.create().parseQuery(query);
  }

  private async initDB() {
    try {
      await this.usersService.registerEmployee(User.instance<User>({ password: 'admin', username: 'admin' }));
    } catch (e) {
      return;
    }
    console.log('Init Database');

    const [grecja, majorka, wlochy] = await this.regionRepo.save([
      Region.instance<Region>({ name: 'Grecja', description: '' }),
      Region.instance<Region>({ name: 'Majorka', description: '' }),
      Region.instance<Region>({ name: 'Włochy', description: '' }),
    ]);
    // const [grecja, majorka, wlochy] = [Region.instance<Region>({ id: 1 }), Region.instance<Region>({ id: 2 }), Region.instance<Region>({ id: 3 })];

    await this.vacationRepo.save([
      Vacation.instance<Vacation>({ accomodations: [Accomodation.instance<Accomodation>({ region: grecja })] }),
      Vacation.instance<Vacation>({ accomodations: [Accomodation.instance<Accomodation>({ region: majorka })] }),
      Vacation.instance<Vacation>({ accomodations: [Accomodation.instance<Accomodation>({ region: wlochy })] }),
    ]);

    await this.hotelRepo.save([
      Hotel.instance<Hotel>({
        name: 'City Hotel',
        description: 'Hotel w centrum miasta',
        rooms: [
          Room.instance<Room>({ personNumber: 2, pricePerDay: 60 }),
        ],
        region: grecja,
      }),
      Hotel.instance<Hotel>({
        name: 'Kapitan Hotel',
        description: 'Wyśmienity hotel',
        rooms: [
          Room.instance<Room>({ personNumber: 2, pricePerDay: 40 }),
          Room.instance<Room>({ personNumber: 2, pricePerDay: 50 }),
          Room.instance<Room>({ personNumber: 3, pricePerDay: 60 }),
        ],
        region: grecja,
      }),
      Hotel.instance<Hotel>({
        name: 'Park Hotel',
        description: 'Bardzo dobry hotel',
        rooms: [
          Room.instance<Room>({ personNumber: 2, pricePerDay: 70 }),
          Room.instance<Room>({ personNumber: 4, pricePerDay: 80 }),
        ],
        region: grecja,
      }),
      Hotel.instance<Hotel>({
        name: 'Vulcan',
        description: 'Najlepszy hotel w regionie',
        rooms: [
          Room.instance<Room>({ personNumber: 3, pricePerDay: 60 }),
          Room.instance<Room>({ personNumber: 3, pricePerDay: 50 }),
        ],
        region: wlochy,
      }),
      Hotel.instance<Hotel>({
        name: 'Garden Hotel',
        description: 'Doskonały hotel',
        rooms: [
          Room.instance<Room>({ personNumber: 2, pricePerDay: 50 }),
          Room.instance<Room>({ personNumber: 2, pricePerDay: 70 }),
          Room.instance<Room>({ personNumber: 2, pricePerDay: 50 }),
        ],
        region: wlochy,
      }),
      Hotel.instance<Hotel>({
        name: 'Sea Hotel',
        description: 'Hotel z widokiem na morze',
        rooms: [
          Room.instance<Room>({ personNumber: 2, pricePerDay: 70 }),
          Room.instance<Room>({ personNumber: 2, pricePerDay: 80 }),
        ],
        region: majorka,
      }),
    ]);
  }
}
