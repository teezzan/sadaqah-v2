import "dotenv/config";
import server from "../../server";
import * as request from "supertest";
import { createTestUser } from "../helpers/createUserHelper";
import { DatabaseProvider } from "../../database";

let user;
let authToken: string;
describe("User Controller methods", () => {
  beforeAll(async () => {
    const dbConn = DatabaseProvider.getConnection();
    await dbConn.sync();
    [user, authToken] = await createTestUser({});
  });
  afterAll(() => {
    server.close();
  });

  test("Should return user details", async () => {
    const response = await request(server)
      .get("/api/user/login")
      .set({
        Authorization: `Bearer ${authToken}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
        avatar: user.picture,
      })
    );
    expect(response.body.id).not.toBeUndefined();
  });

  test("Should not return user details due to lack of auth", async () => {
    const response = await request(server).get("/api/user/login");
    expect(response.status).toBe(401);
  });
});
