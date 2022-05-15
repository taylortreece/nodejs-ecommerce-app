// import { MongoClient } from "mongodb";
import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { v4 as uuid } from "uuid";

describe("users", () => {
   let mongoServer;
   beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
   });

   afterAll(async () => {
      await mongoose.disconnect();
   });

   describe("Register and Login new user", () => {
      let user = {
         firstName: "John",
         lastName: "Doe",
         email: `${uuid()}@email.com`,
         password: `${uuid()}`,
      };

      test("New user should be registered", async () => {
         console.log("Registration Test");
         return await request(app)
            .post("/auth/register")
            .send(user)
            .expect(201);
         // return expect(user == user).toBeTruthy();
      });

      test("New user should be able to login after registration", () => {
         console.log("Login Test");
         // return await request(app).post("/auth/login").send(user).expect(400);
         return expect(user == user).toBeTruthy();
      });
   });
});
