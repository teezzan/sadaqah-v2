import "dotenv/config";
import server from "../../server";
import * as request from "supertest";

describe("Ping Controller Test", () => {
  afterAll(() => {
    server.close();
  });

  test("Check Server Availability", async () => {
    const response = await request(server).get("/api/ping");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ping: "OK",
    });
  });
});
