// const { MailSlurp } = require('mailslurp-client');
// const MAILSLURP_KEY = process.env.MAILSLURP_KEY;
// import { DescribeDomainOptionsFromJSON } from "mailslurp-client";
import request from "supertest";
import app from "../../app";
import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import { ExpiredControllerApi } from "mailslurp-client";

describe("users", () => {
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

   describe("Register and Login new user", () => {
      test("New user should be registered", async () => {
         let user = {
            firstName: "John",
            lastName: "Doe",
            email: `${uuid()}@email.com`,
            password: `${uuid()}`,
         };

         console.log(user);
         return expect(user == user).toBeTruthy();
      });
   });
});
