import {
  PROVIDER,
  STATUS,
  SUPPORTED_CURRENCY,
  TransactionRequest,
  TransactionResponse,
  TRANSACTION_TYPES,
} from "../../../types/transaction/transaction";

export const testTransaction: TransactionRequest = {
  user_id: "rtytuytresdv",
  group_id: "rfgjhytdfsgf",
  amount: 500000,
  provider: PROVIDER.PAYSTACK,
  type: TRANSACTION_TYPES.ONE_TIME_PAYMENT,
  currency: SUPPORTED_CURRENCY.NGN,
};

export const testResponse: TransactionResponse = {
  payment_link: "htewsfd",
  status: STATUS.PENDING,
};
