export enum SUPPORTED_CURRENCY {
  NGN = "NGN",
}
export enum COUNTRY {
  NIGERIA = "nigeria",
}

export enum STATUS {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REVERSED = "reversed",
}

export enum TRANSFER_FROM {
  BALANCE = "balance",
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

export interface ListBankRequest {
  country: COUNTRY;
  use_cursor: boolean;
  perPage: number;
  next?: string;
  currency: SUPPORTED_CURRENCY;
}

export interface ListBankResponse {
  status: boolean;
  message: string;
  data: any[];
  meta: {
    next: null | string;
    previous: null | string;
    perPage: number;
  };
}

export interface VerifyAccountNumberRequest {
  account_number: string;
  bank_code: string;
}

export interface VerifyAccountNumberResponse {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export interface TransferRecipientRequest {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency: SUPPORTED_CURRENCY;
}
export interface TransferRecipientResponse {
  recipient_code: string;
}

export interface BalanceRequest {
  currency: SUPPORTED_CURRENCY;
}

export interface BalanceResponse {
  balance: number;
}

export interface BalanceAccount {
  currency: SUPPORTED_CURRENCY;
  balance: number;
}

export interface InitializeTransferRequest {
  source: TRANSFER_FROM;
  amount: number;
  recipient: string;
  reference: string;
  reason?: string;
  currency: SUPPORTED_CURRENCY;
}

export interface InitializeTransferResponse {
  "transfer_code": string;
  id: number;
  otp_required: boolean;
}

export interface FinalizeTransferRequest {
  "transfer_code": string;
  otp: string;
}

export interface FinalizeTransferResponse {
  amount: number;
  id: number;
}

export interface TransferStatusRequest {
  "transfer_code": string;
}

export interface TransferStatusResponse {
  status: STATUS;
}
