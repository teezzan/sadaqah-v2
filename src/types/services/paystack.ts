export enum SUPPORTED_CURRENCY {
  NGN = "NGN",
}

export enum STATUS {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface InitializeTransactionRequest {
  amount: number; //in naira
  email: string;
  currency: SUPPORTED_CURRENCY;
  reference: string;
  callback_url: string;
}

export interface InitializeTransactionResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface TransactionStatusRequest {
  reference: string;
}
export interface TransactionStatusResponse {
  status: STATUS;
}
