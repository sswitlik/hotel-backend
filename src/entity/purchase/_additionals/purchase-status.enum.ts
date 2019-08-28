export enum PurchaseStatus {
  RESERVED = 'RESERVED',
  RESIGNED = 'RESIGNED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  EXECUTED = 'EXECUTED',
}

export const activePurchaseStatuses = [PurchaseStatus.PAID, PurchaseStatus.RESERVED];
