const request = require("supertest");
const app = require("../backend/app");
const mongoose = require("mongoose")
const { MailSlurp } = require("mailslurp-client")
const MAILSLURP_KEY = process.env.MAILSLURP_KEY

afterAll(done => {
  mongoose.connection.close()
  done()
})

test("It should response the GET method from '/'", async () => {
  const response = await request(app).get("/");
  expect(response.statusCode).toBe(200);
});
  
test("It should response the GET method from '/products'", async () => {
    return await request(app)
      .get("/products")
      .expect(200)
});

describe("registration and login", () => {
  it("can sign up as a new user", async () => {

  })
}) 

// add test for mongoDB Connection