import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsFuture', async: false })
export class IsFutureValidator implements ValidatorConstraintInterface {

  validate(value: Date, args: ValidationArguments) {
    try {
      return value.getTime() > Date.now();
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return `${args.property} must be future`;
  }

}
