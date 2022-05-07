import server from "../helpers";

const request = require("supertest")
describe("Ping Controller Test", () => {
    afterAll(()=>{
        server.close()
    })
    
    test("Check Server Availability", async () => {
        const response = await request(server).get("/hello")
        expect(response.status).toBe(200)
        expect(response.body).toBe("Hello World!")
        
    })

})