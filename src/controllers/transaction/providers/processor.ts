import {
  PROVIDER,
  TRANSACTION_TYPES,
} from "../../../types/transaction/transaction";
import { InvalidPaymentProvider, InvalidTransactionType } from "../errors";
import { SUPPORTED_CURRENCY as PayStackCurrency } from "../../../types/transaction/providers/paystack";
import { OneTimePayment as PayStackOneTimePayment } from "./paystack/oneTimePayment";
import { Withdraw as PayStackRemittance } from "./paystack/withdraw";

function chooseOneTimePaymentProvider(
  provider: PROVIDER,
  currency: PayStackCurrency
) {
  switch (provider) {
    case PROVIDER.PAYSTACK:
      return new PayStackOneTimePayment(currency);

    default:
      throw new InvalidPaymentProvider();
  }
}

/*** @todo: check to see if recipient is group admin ***/
function chooseRemittanceProvider(
  provider: PROVIDER,
  currency: PayStackCurrency
) {
  switch (provider) {
    case PROVIDER.PAYSTACK:
      return new PayStackRemittance(currency);

    default:
      throw new InvalidPaymentProvider();
  }
}

export function chooseProvider(
  transactionType: TRANSACTION_TYPES,
  provider: PROVIDER,
  currency: PayStackCurrency
) {
  switch (transactionType) {
    case TRANSACTION_TYPES.ONE_TIME_PAYMENT:
      return chooseOneTimePaymentProvider(provider, currency);

    case TRANSACTION_TYPES.G_ADMIN_REMITTANCE:
      return chooseRemittanceProvider(provider, currency);

    default:
      throw new InvalidTransactionType();
  }
}
