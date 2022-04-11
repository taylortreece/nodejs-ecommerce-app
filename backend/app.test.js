const request = require("supertest");
const app = require("../backend/app");

describe("Test the root path", () => {
    test("It should reponse the GET method", () => {
        return request(app)
          .get("/")
          .expect(200)
    })
})