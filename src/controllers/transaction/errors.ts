export class InvalidPaymentProvider extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidPaymentProvider";
  }
}
export class InvalidTransactionType extends Error {
    constructor(message?: string) {
      super(message);
      this.name = "InvalidTransactionType";
    }
  }