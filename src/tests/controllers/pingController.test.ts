const request = require("supertest")
const ApiServer = require("../../server")

const server = new ApiServer();
describe("Ping Controller Test", async () => {
    const response = await request(server)
        .get("/hello")
    console.log(response);




})