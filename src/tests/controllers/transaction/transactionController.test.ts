import "dotenv/config";
import server from "../../../server";
import * as request from "supertest";
import { createTestTransaction } from "../../helpers/createTransactionHelper";
import { TransactionRequest } from "../../../types/transaction/transaction";

let transaction: TransactionRequest;
let authToken: string;
describe("Check Server Availability", () => {
  beforeAll(async () => {
    [transaction, authToken] = await createTestTransaction({});
  });
  afterAll(() => {
    server.close();
  });

  test("Should create a transaction", async () => {
    const response = await request(server)
      .post("/api/transaction/create")
      .send(transaction)
      .set({
        Authorization: `Bearer ${authToken}`,
      });
    expect(response.status).toBe(200);
    expect(response).toMatchObject({
      payment_link: expect.any(String),
      status: expect.any(String),
    });
  });

  test("Fail transaction due to lack of auth", async () => {
    const response = await request(server)
      .post("/api/transaction/create")
      .send(transaction);
    expect(response.status).toBe(401);
  });
});
