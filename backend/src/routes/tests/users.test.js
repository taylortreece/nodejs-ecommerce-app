import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
   fieldsCheck,
   passwordCheck,
   generateUser,
} from "../../utils/testHelpers";

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
      const user = generateUser();
      console.log("USER: ", user);
      const fields = ["first_name", "last_name", "email", "password", "token"];

      test("New user should be registered and password should be encrypted", async () => {
         const res = await request(app).post("/auth/register").send(user);
         const userPwd = user.password;
         const encryptedPwd = res.body.password;

         expect(res.headers["content-type"]).toMatch(/json/);
         expect(res.status).toEqual(201);
         expect(await passwordCheck(userPwd, encryptedPwd)).toEqual(true);
         expect(fieldsCheck(res.body, fields)).toEqual(true);
      });

      test("New user should be able to login after registration", async () => {
         const res = await request(app).post("/auth/login").send(user);

         expect(res.headers["content-type"]).toMatch(/json/);
         expect(res.status).toEqual(200);
         expect(fieldsCheck(res.body, fields)).toEqual(true);
      });
   });
});
