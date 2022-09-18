import { PaystackAxios } from "./paystackAxios";
import * as types from "../../../../types/transaction/providers/paystack";
import * as errors from "./errors";

// uses https://paystack.com/docs/payments/accept-payments/#redirect

export class OneTimePayment extends PaystackAxios {
  constructor(private currency: types.SUPPORTED_CURRENCY) {
    if (!currency) throw new errors.PaystackCurrencyRequiredError();
    super();
  }
  async initializeTransaction(
    r: types.InitializeTransactionRequest
  ): Promise<types.InitializeTransactionResponse> {
    if (r.currency !== this.currency)
      throw new errors.PaystackCurrencyMismatchError("currency mismatch");
    const { data } = await this.http().post("/transaction/initialize", {
      ...r,
      amount: `${r.amount}00`, //in kobo //wrong use correct number to coins method
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    });
    return data?.data;
  }

  async verifyTransactionStatus(
    r: types.TransactionStatusRequest
  ): Promise<types.TransactionStatusResponse> {
    const { data } = await this.http().get(
      `/transaction/verify/${r.reference}`
    );
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
