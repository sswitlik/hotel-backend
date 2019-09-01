import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Purchase } from '../purchase.entity';

@ValidatorConstraint({ name: 'IsEnoughSpaceForParticipants', async: false })
export class IsEnoughSpaceForParticipantsValidator implements ValidatorConstraintInterface {

  validate(group: Purchase, args: ValidationArguments) {
    const { participants, rooms } = group;
    try {
      return rooms.reduce((prev, curr) => prev + curr.personNumber, 0) >= participants.length;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return 'Sum of rooms space must grater or equal than number of participants';
  }

}
