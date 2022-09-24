import "dotenv/config";
import server from "../../server";
import * as request from "supertest";
import { createTestUser } from "../helpers/createUserHelper";
import { DatabaseProvider } from "../../database";
import { truncateGroupTable } from "../helpers/truncateGroupTable";

let user;
let authToken: string;
describe("Group controller methods", () => {
  beforeAll(async () => {
    const dbConn = DatabaseProvider.getConnection();
    await dbConn.sync();
    [user, authToken] = await createTestUser();
    await request(server)
      .get("/api/user/login")
      .set({
        Authorization: `Bearer ${authToken}`,
      });
  });
  afterAll(async () => {
    await truncateGroupTable();
    server.close();
  });

  test("Should create a group", async () => {
    const groupName = "RandoGroup";

    const response = await request(server)
      .post("/api/group/create")
      .set({
        Authorization: `Bearer ${authToken}`,
      })
      .send({
        name: groupName,
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(groupName);
    expect(response.body.id).not.toBeFalsy();
  });

  test("Should fail to create a group with duplicate name", async () => {
    const groupName = "RandoGroup";
    const response = await request(server)
      .post("/api/group/create")
      .set({
        Authorization: `Bearer ${authToken}`,
      })
      .send({
        name: groupName,
      });
    expect(response.status).not.toBe(201);
  });
});
