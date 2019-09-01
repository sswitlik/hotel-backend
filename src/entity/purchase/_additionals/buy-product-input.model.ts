import { Purchase } from '../purchase.entity';
import { Client } from '../../client/client.entity';
import { Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TermPeriodValidator } from './term-period.validator';

export class BuyProductInput {
  @ValidateNested()
  @Validate(TermPeriodValidator)
  // @Validate(AreRoomsInProductValidator)
  // @Validate(IsEnoughSpaceForParticipantsValidator)
  @Type(() => Purchase)
  purchase: Purchase;

  @ValidateNested()
  @Type(() => Client)
  clientData: Client;
}

const mock = {
  'purchase': {
    'product': {
      'id': 1,
      'accomodations': [
        {
          'id': 1,
          'region': {
            'id': 1,
            'name': 'Polska',
            'description': '',
          },
        },
      ],
    },
    'participants': [
      {
        'firstName': 'A',
        'lastName': 'AA',
        'birthDate': '1996-12-13T23:00:00.000Z',
        'sex': 'M',
      },
    ],
    'termFrom': '1996-12-13T23:00:00.000Z',
    'termTo': '1997-06-01T22:00:00.000Z',
    'rooms': [
      {
        'id': 1,
        'personNumber': 1,
        'hotel': {
          'id': 1,
          'region': {
            'id': 1,
          },
        },
      },
    ],
  },
  'clientData': {
    'email': 'a@a.pl',
  },
};
