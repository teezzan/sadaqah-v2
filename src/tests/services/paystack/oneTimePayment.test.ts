import mockAxios from "../../__mocks__/axios";
import { v4 as uuidv4 } from "uuid";
import * as types from "../../../types/services/paystack";
import { OneTimePayment } from "../../../controllers/paystack/oneTimePayment";

const initializeTransactionRequest: types.InitializeTransactionRequest = {
  amount: 5000000, //in naira
  email: "test@gmail.com",
  currency: types.SUPPORTED_CURRENCY.NGN,
  reference: uuidv4(),
  callback_url: "http://localhost:8080/",
};
const verifyTransactionRequest: types.TransactionStatusRequest = {
  reference: "dddf20e0-52ec-407e-b14f-5df45fc05e76",
};
const islamicBankCodes = ["301", "302", "303"];
const bankCode =
  islamicBankCodes[Math.floor(Math.random() * islamicBankCodes.length)];

afterEach(() => {
  mockAxios.reset();
});

describe("test paystack payments", () => {
  it("should initialize transaction", async () => {
    const promise = new OneTimePayment(
      types.SUPPORTED_CURRENCY.NGN
    ).initializeTransaction(initializeTransactionRequest);
    const newPaymentBody = {
      ...initializeTransactionRequest,
      amount: `${initializeTransactionRequest.amount}00`, //in kobo
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    };
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "/transaction/initialize",
      newPaymentBody
    );
    // simulating a server response
    const responseObj = {
      data: {
        status: true,
        data: {
          authorization_url: "https://checkout.paystack.com/0peioxfhpn",
          access_code: "0peioxfhpn",
          reference: "7PVGX8MEk85tgeEpVDtD",
        },
      },
      status: 201,
    };
    mockAxios.mockResponse(responseObj);
    const result = await promise;
    expect(result).toMatchObject({
      authorization_url: expect.any(String),
      access_code: expect.any(String),
      reference: expect.any(String),
    });
    expect(result).toEqual({
      authorization_url: "https://checkout.paystack.com/0peioxfhpn",
      access_code: "0peioxfhpn",
      reference: "7PVGX8MEk85tgeEpVDtD",
    });
  }, 60_000);

  it("should check transaction status", async () => {
    const promise = new OneTimePayment(
      types.SUPPORTED_CURRENCY.NGN
    ).verifyTransactionStatus(verifyTransactionRequest);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/transaction/verify/${verifyTransactionRequest.reference}`
    );
    mockAxios.mockResponse({
      data: {
        status: true,
        data: {
          status: "success",
        },
      },
    });
    const result = await promise;
    expect(["success", "pending", "failed"]).toContain(result.status);
    expect(result.status).toEqual("success");
  }, 60_000);
});
