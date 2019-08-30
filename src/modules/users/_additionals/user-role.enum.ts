export enum UserRole {
  ANONYMUS = 'ANONYMUS',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export const EmployeeAndMore = () => [UserRole.EMPLOYEE, UserRole.ADMIN];
