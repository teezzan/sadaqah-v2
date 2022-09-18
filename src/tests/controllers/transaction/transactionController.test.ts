import "dotenv/config";
import server from "../../../server";
import * as request from "supertest";
import { createTestTransaction } from "../../helpers/createTransactionHelper";

let transaction;
let authToken: string;
describe("Check Server Availability", () => {
  beforeAll(async () => {
    [transaction, authToken] = await createTestTransaction({});
  });
  afterAll(() => {
    server.close();
  });

  fix this shittt
  test("Should create a transaction", async () => {
    const response = await request(server)
      .post("/api/transaction/create")
      .set({
        Authorization: `Bearer ${authToken}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ping: "Authorized OK",
    });
  });
});
