import { PaystackAxios } from "./paystackAxios";
import * as types from "../../types/services/paystack";
import * as errors from "./errors";

export class Withdraw extends PaystackAxios {
  constructor(private currency: types.SUPPORTED_CURRENCY) {
    if (!currency) throw new errors.PaystackCurrencyRequiredError();
    super();
  }

  private compareCurrency(request_currency: types.SUPPORTED_CURRENCY) {
    if (request_currency !== this.currency)
      throw new errors.PaystackCurrencyMismatchError("currency mismatch");
  }

  async verifyAccountNumber(
    r: types.VerifyAccountNumberRequest
  ): Promise<types.VerifyAccountNumberResponse> {
    const { data } = await this.http().get(
      `/bank/resolve?account_number=${r.account_number}&bank_code=${r.bank_code}`
    );
    return data?.data;
  }

  async balance(r: types.BalanceRequest): Promise<types.BalanceResponse> {
    this.compareCurrency(r.currency);
    const { data } = await this.http().get("/balance");
    const balances = data?.data ?? [];
    const balance = balances.find(
      (account: types.BalanceAccount) => account.currency === r.currency
    )?.balance;

    if (!balance) throw new errors.PaystackInvalidBalanceError();

    return {
      balance, //in kobo
    };
  }

  async createTransferRecipient(
    r: types.TransferRecipientRequest
  ): Promise<types.TransferRecipientResponse> {
    this.compareCurrency(r.currency);
    const { data } = await this.http().post("/transferrecipient", r);

    return {
      recipient_code: data.data.recipient_code,
    };
  }

  async initiateTransfer(
    r: types.InitializeTransferRequest
  ): Promise<types.InitializeTransferResponse> {
    this.compareCurrency(r.currency);
    const { data } = await this.http().post("/transfer", {
      ...r,
      amount: Number(`${r.amount}00`), //in kobo
    });
    let otp_required = false;
    const status = data?.data?.status;
    if (status === "otp") otp_required = true;
    return {
      transfer_code: data.data.transfer_code,
      id: data.data.id,
      otp_required,
    };
  }

  async finalizeTransfer(
    r: types.FinalizeTransferRequest
  ): Promise<types.FinalizeTransferResponse> {
    const { data } = await this.http().post("/transfer/finalize_transfer", r);

    console.info({ data });

    return {
      amount: data.data.amount,
      id: data.data.id,
    };
  }

  async fetchTransferStatus(
    r: types.TransferStatusRequest
  ): Promise<types.TransferStatusResponse> {
    const { data } = await this.http().get(`/transfer/${r.transfer_code}`);

    const status = data?.data?.status;

    if (!Object.values(types.STATUS)?.includes(status))
      throw new errors.PaystackInvalidTransactionStatusError(
        `Status: ${status}`
      );

    return {
      status,
    };
  }
}
