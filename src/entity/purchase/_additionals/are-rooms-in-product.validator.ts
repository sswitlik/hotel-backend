import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Purchase } from '../purchase.entity';

@ValidatorConstraint({ name: 'AreRoomsInProduct', async: false })
export class AreRoomsInProductValidator implements ValidatorConstraintInterface {

  validate(group: Purchase, args: ValidationArguments) {
    try {
      const { product, rooms } = group;
      // works only for hotels (due to accomodations[0])
      return rooms.every(room => room.hotel.region.id === product.accomodations[0].region.id);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return 'Each room must be in hotel of selected region';
  }

}
