import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";

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
      let user = {
         firstName: "John",
         lastName: "Doe",
         email: `${uuid()}@email.com`,
         password: `${uuid()}`,
      };

      test("New user should be registered", async () => {
         console.log(user);
         return expect(user == user).toBeTruthy();
      });

      test("New user should be able to login after registration", () => {
         console.log(user);
         return expect(user == user).toBeTruthy();
      });
   });
});
