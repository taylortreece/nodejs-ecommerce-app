// const { MailSlurp } = require('mailslurp-client');
// const MAILSLURP_KEY = process.env.MAILSLURP_KEY;
// import { DescribeDomainOptionsFromJSON } from "mailslurp-client";
import request from "supertest";
import app from "./app";
import { MongoClient } from "mongodb";

describe("routes", () => {
   let connection;
   let db;

   beforeAll(async () => {
      connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      db = await connection.db(globalThis.__MONGO_DB_NAME__);
   });

   afterAll(async () => {
      await connection.close();
   });

   describe("index", () => {
      test("It should response the GET method from '/'", async () => {
         return await request(app).get("/").expect(200);
      });
   });

   describe("products", () => {
      test("It should response the GET method from '/products'", async () => {
         return await request(app).get("/products").expect(200);
      });
   });

   describe("login", () => {
      test("It should respond the POST method from '/auth/login'", async () => {
         return await request(app).post("/auth/login", {}).expect(400);
      });
   });
});

// describe("registration and login", () => {
//   it("can sign up as a new user", async () => {});
// });

// add test for mongoDB Connection
