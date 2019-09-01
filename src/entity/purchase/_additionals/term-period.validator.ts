import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Purchase } from '../purchase.entity';
import { getWithDefault } from '../../../modules/functions/get-with-default.function';

@ValidatorConstraint({ name: 'TermPeriod', async: false })
export class TermPeriodValidator implements ValidatorConstraintInterface {

  validate(group: Purchase, args: ValidationArguments) {
    return getWithDefault(() => group.termTo.getTime()) >= getWithDefault(() => group.termFrom.getTime()); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return 'TermTo must greater or equal to termFrom';
  }

}
