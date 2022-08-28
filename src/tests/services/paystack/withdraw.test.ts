import mockAxios from "../../__mocks__/axios";
import { v4 as uuidv4 } from "uuid";
import * as types from "../../../types/services/paystack";
import { PaystackInvalidTransactionStatusError } from "../../../controllers/paystack/errors";
import { Withdraw } from "../../../controllers/paystack/withdraw";

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
const finalizeTransferRequest: types.FinalizeTransferRequest = {
  transfer_code: "TRF_zurexxnoflluzxpq",
  otp: "123456",
};

afterEach(() => {
  mockAxios.reset();
});

describe("test paystack transfers", () => {
  it("should verify an account number", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).verifyAccountNumber(verifyAccountNumberRequest);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/bank/resolve?account_number=${verifyAccountNumberRequest.account_number}&bank_code=${verifyAccountNumberRequest.bank_code}`
    );
    mockAxios.mockResponse({
      data: {
        status: true,
        data: {
          account_number: "0221450751",
          account_name: "John Doe",
          bank_id: 58,
        },
      },
    });
    const result = await promise;
    expect(result).toMatchObject({
      account_number: expect.any(String),
      account_name: expect.any(String),
      bank_id: expect.any(Number),
    });
    expect(result.account_name).toEqual("John Doe");
  }, 60_000);

  it("should create a transfer recipient code", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).createTransferRecipient(transferRecipientRequest);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "/transferrecipient",
      transferRecipientRequest
    );
    mockAxios.mockResponse({
      data: {
        data: {
          recipient_code: "RCP_8s7i22pdw9ijbxm",
        },
      },
    });
    const result = await promise;
    expect(result).toMatchObject({
      recipient_code: expect.any(String),
    });
    expect(result).toEqual({
      recipient_code: "RCP_8s7i22pdw9ijbxm",
    });
  }, 60_000);

  it("should check paystack balance", async () => {
    const promise = new Withdraw(types.SUPPORTED_CURRENCY.NGN).balance({
      currency: types.SUPPORTED_CURRENCY.NGN,
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/balance`);
    mockAxios.mockResponse({
      data: {
        data: [
          {
            currency: "NGN",
            balance: 5000000000000000,
          },
        ],
      },
    });
    const result = await promise;
    expect(result).toMatchObject({
      balance: expect.any(Number),
    });
    expect(result).toEqual({ balance: 5000000000000000 });
  }, 60_000);

  it("should initiate a transfer", async () => {
    const promise = new Withdraw(types.SUPPORTED_CURRENCY.NGN).initiateTransfer(
      initializeTransferRequest
    );
    const newTransferBody = {
      ...initializeTransferRequest,
      amount: Number(`${initializeTransferRequest.amount}00`),
    };
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "/transfer",
      newTransferBody
    );
    mockAxios.mockResponse({
      data: {
        status: true,
        data: {
          status: "otp",
          transfer_code: "TRF_zurexxnoflluzxpq",
          id: 10,
        },
      },
    });
    const result = await promise;
    expect(result).toMatchObject({
      transfer_code: expect.any(String),
      otp_required: expect.any(Boolean),
      id: expect.any(Number),
    });
    expect(result).toEqual({
      transfer_code: "TRF_zurexxnoflluzxpq",
      otp_required: true,
      id: 10,
    });
  }, 60_000);

  it("should fetch transfer status", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).fetchTransferStatus(transferStatusRequest);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/transfer/${transferStatusRequest.transfer_code}`
    );
    mockAxios.mockResponse({
      data: {
        data: {
          status: 'pending'
        }
      }
    });
    const result = await promise;
    expect(result).toMatchObject({
      status: expect.any(String),
    });
    expect(result).toEqual({ status: 'pending' });
  }, 60_000);

  it("should throw PaystackInvalidTransactionStatusError", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).fetchTransferStatus(transferStatusRequest);
    mockAxios.mockResponse({
      data: {
        data: {
          status: 'bad status'
        }
      }
    });
    expect(
      promise
    ).rejects.toThrow(PaystackInvalidTransactionStatusError);
  }, 60_000);

  it("should finalize transfer", async () => {
    const promise = new Withdraw(
      types.SUPPORTED_CURRENCY.NGN
    ).finalizeTransfer(finalizeTransferRequest);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith("/transfer/finalize_transfer", finalizeTransferRequest);
    mockAxios.mockResponse({
      data: {
        data: {
          amount: 90000,
          id: 100
        },
      },
    });
    const result = await promise;
    expect(result).toEqual({ amount: 90000,
      id: 100 });
  });
});
