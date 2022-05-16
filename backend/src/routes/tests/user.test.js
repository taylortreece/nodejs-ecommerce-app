import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

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

      const fields = ["first_name", "last_name", "email", "password", "token"];

      test("New user should be registered and password should be encrypted", async () => {
         const res = await request(app).post("/auth/register").send(user);

         expect(res.headers["content-type"]).toMatch(/json/);
         expect(res.status).toEqual(201);
         expect(await bcrypt.compare(user.password, res.body.password)).toEqual(
            true
         );
         expect(res.body.hasOwnProperty("token")).toEqual(true);
      });
   });
});

// test("New user should be able to login after registration", async () => {
//    console.log("Login Test");
//    return await request(app)
//       .post("/auth/login")
//       .send(user)
//       .expect("Content-Type", "application/json; charset=utf-8")
//       .expect(200);
// });
