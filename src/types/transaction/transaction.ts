export enum SUPPORTED_CURRENCY {
  NGN = "NGN",
}

export enum STATUS {
  CREATED = "created",
  PROCESSING = "processing",
  PROCESSED = "processed",
  PENDING = "pending",
  FAILED = "failed",
  COMPLETE = "complete",
}

export enum PROVIDER {
  PAYSTACK = "paystack",
}
export enum TRANSACTION_TYPES {
  ONE_TIME_PAYMENT = "one_time_payment",
  SUBSCRIPTION = "subscription",
  G_ADMIN_REMITTANCE = "remittance",
  REFUND = "refund",
}

export interface TransactionRequest {
  user_id: string;
  group_id: string;
  amount: number; //e.g in naira
  type: TRANSACTION_TYPES;
  provider: PROVIDER; // e,g paystack
  currency: SUPPORTED_CURRENCY;
}

export interface TransactionResponse {
  payment_link?: string;
  status: STATUS;
}
