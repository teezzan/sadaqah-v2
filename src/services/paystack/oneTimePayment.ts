import { PaystackAxios } from "./paystackAxios";
import * as types from "../../types/services/paystack";
import * as errors from "./errors";

// uses https://paystack.com/docs/payments/accept-payments/#redirect

export class OneTimePayment extends PaystackAxios {
  constructor(private currency: types.SUPPORTED_CURRENCY) {
    super(currency);
  }
  async initializeTransaction(
    r: types.InitializeTransactionRequest
  ): Promise<types.InitializeTransactionResponse> {
    if (r.currency !== this.currency)
      throw new errors.PaystackCurrencyMismatchError("currency mismatch");
    const { data } = await this.http().post("/transaction/initialize", {
      ...r,
      amount: `${r.amount}00`, //in kobo
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    });

    console.info(JSON.stringify(data, null, 2));

    return data?.data;
  }

  async verifyTransaction(
    //https://paystack.com/docs/payments/verify-payments/
    r: types.TransactionStatusRequest
  ): Promise<types.TransactionStatusResponse> {
    const { data } = await this.http().get(`/transaction/verify/${r.reference}`);

    console.info(JSON.stringify(data, null, 2));

    const status = data?.data?.status;
    if (!data.status) {
      throw new errors.PaystackApiError(`${data.message}`);
    }

    switch (status) {
      case "success":
        return { status: types.STATUS.SUCCESS };
      case "failed":
        return { status: types.STATUS.FAILED };
      case "abandoned":
        return { status: types.STATUS.PENDING };
      default:
        throw new errors.PaystackInvalidTransactionStatusError(
          `status: ${status}`
        );
    }
  }
}
