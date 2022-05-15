import { v4 as uuidv4 } from "uuid";
import * as types from "../../../types/services/paystack";
import { Withdraw } from "../../../services/paystack/withdraw";

const verifyAccountNumberRequest: types.VerifyAccountNumberRequest = {
  account_number: "0221450751",
  bank_code: "058",
};
const transferRecipientRequest: types.TransferRecipientRequest = {
  type: "nuban",
  name: "John Doe",
  account_number: "0221450751",
  bank_code: "058",
  currency: types.SUPPORTED_CURRENCY.NGN,
};

const initializeTransferRequest: types.InitializeTransferRequest = {
  source: types.TRANSFER_FROM.BALANCE,
  amount: 5, //in naira
  recipient: "RCP_8s7i22pdw9ijbxm",
  reference: uuidv4(),
  reason: "Sadaqah",
  currency: types.SUPPORTED_CURRENCY.NGN,
};

const transferStatusRequest: types.TransferStatusRequest = {
  transfer_code: "TRF_zurexxnoflluzxpq",
};

describe("test paystack transfers", () => {
  it("should verify an account number", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).verifyAccountNumber(verifyAccountNumberRequest);
    const result = await promise;
    expect(result).toMatchObject({
      account_number: expect.any(String),
      account_name: expect.any(String),
      bank_id: expect.any(Number),
    });
  }, 60_000);

  it("should create a transfer recipient code", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).createTransferRecipient(transferRecipientRequest);
    const result = await promise;
    expect(result).toMatchObject({
      recipient_code: expect.any(String),
    });
  }, 60_000);

  it("should check paystack balance", async () => {
    const promise = new Withdraw(types.SUPPORTED_CURRENCY.NGN).balance({
      currency: types.SUPPORTED_CURRENCY.NGN,
    });
    const result = await promise;
    expect(result).toMatchObject({
        balance: expect.any(Number),
    });
  }, 60_000);

  it("should initiate a transfer", async () => {
    const promise = new Withdraw(types.SUPPORTED_CURRENCY.NGN).initiateTransfer(
      initializeTransferRequest
    );
    const result = await promise;
    expect(result).toMatchObject({
      transfer_code: expect.any(String),
      otp_required: expect.any(Boolean),
      id: expect.any(Number),
    });
  }, 60_000);

  it("should fetch transfer status", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).fetchTransferStatus(transferStatusRequest);
    const result = await promise;
    expect(result).toMatchObject({
      status: expect.any(String),
    });
  }, 60_000);
});
