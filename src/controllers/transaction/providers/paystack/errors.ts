export class PaystackCurrencyRequiredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaystackCurrencyRequiredError";
  }
}

export class PaystackCurrencyMismatchError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaystackCurrencyMismatchError";
  }
}

export class PaystackInvalidTransactionStatusError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaystackInvalidTransactionStatusError";
  }
}

export class PaystackApiError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaystackApiError";
  }
}

export class PaystackInvalidBalanceError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaystackInvalidBalanceError";
  }
}
