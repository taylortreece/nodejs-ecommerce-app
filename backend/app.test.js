const request = require("supertest");
const app = require("../backend/app");
// const mongoDB = require("./config/database")

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });

describe("Test the products path", () => {
    test("It should response the GET method", async () => {
        return await request(app)
          .get("/products")
          .expect(200)
    });
});

// add test for mongoDB Connection