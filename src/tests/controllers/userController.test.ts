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

  test("Should Require Authorised Access to Work", async () => {
    const response = await request(server)
      .get("/api/user/login")
      .set({
        Authorization: `Bearer ${authToken}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: user.name,
      email: user.email,
      avatar: user.picture,
    });
    expect(response.body.id).not.toBeUndefined();
  });
});
