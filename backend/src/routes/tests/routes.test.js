// const { MailSlurp } = require('mailslurp-client');
// const MAILSLURP_KEY = process.env.MAILSLURP_KEY;
// import { DescribeDomainOptionsFromJSON } from "mailslurp-client";
import request from "supertest";
import app from "../../app";
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
      test("GET '/' should return status '200'", async () => {
         return await request(app).get("/").expect(200);
      });
   });

   describe("products", () => {
      test("GET '/products' should return status '200'", async () => {
         return await request(app).get("/products").expect(200);
      });
   });

   describe("login", () => {
      test("GET '/auth/login' should return status '200'", async () => {
         return await request(app).get("/auth/login").expect(200);
      });

      test("POST '/auth/login' should return status '400' without body", async () => {
         return await request(app).post("/auth/login").expect(400);
      });
   });

   describe("register", () => {
      test("GET '/auth/register' should return status '200'", async () => {
         return await request(app).get("/auth/register").expect(200);
      });

      test("POST '/auth/register' should return status '400' without body", async () => {
         return await request(app).post("/auth/register").expect(400);
      });
   });
});
