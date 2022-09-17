import "dotenv/config";
import server from "../../server";
import * as request from "supertest";
import { createTestUser } from "../helpers/createUserHelper";

let user;
let authToken: string;
describe("Check Server Availability", () => {
  beforeAll(async () => {
    [user, authToken] = await createTestUser({});
  });
  afterAll(() => {
    server.close();
  });

  test("Should Require Unauthorised Access to Work", async () => {
    const response = await request(server).get("/api/user/freeping");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ping: "Non-Authorized OK",
    });
  });

  test("Should Require Authorised Access to Work", async () => {
    const response = await request(server)
      .get("/api/user/ping")
      .set({
        Authorization: `Bearer ${authToken}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ping: "Authorized OK",
    });
  });
});
