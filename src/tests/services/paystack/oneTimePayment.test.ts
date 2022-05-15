import { v4 as uuidv4 } from "uuid";
import * as types from "../../../types/services/paystack";
import { OneTimePayment } from "../../../services/paystack/oneTimePayment";

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

describe("test paystack payments", () => {
  it("should initialize transaction", async () => {
    const promise = new OneTimePayment(
      types.SUPPORTED_CURRENCY.NGN
    ).initializeTransaction(initializeTransactionRequest);
    const result = await promise;
    // console.info(result.authorization_url);
    expect(result).toMatchObject({
      authorization_url: expect.any(String),
      access_code: expect.any(String),
      reference: expect.any(String),
    });
  }, 60_000);

  it("should check transaction status", async () => {
    const promise = new OneTimePayment(
      types.SUPPORTED_CURRENCY.NGN
    ).verifyTransactionStatus(verifyTransactionRequest);
    const result = await promise;
    expect(["success", "pending", "failed"]).toContain(result.status);
  }, 60_000);
});
