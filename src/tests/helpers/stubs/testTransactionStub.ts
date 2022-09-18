import {
  PROVIDER,
  SUPPORTED_CURRENCY,
  TransactionRequest,
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
