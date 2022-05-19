import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
   generateUser,
   fieldsCheck,
   passwordCheck,
} from "../../utils/testHelpers";

let user = generateUser();
const fields = ["first_name", "last_name", "email", "password", "token"];

describe("users", () => {
   let mongoServer;

   beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), { dbName: "MongoServer" });
   });

   afterAll(async () => {
      await mongoose.disconnect();
   });

   describe("Register and Login new user", () => {
      test("New user should be registered with encrypted password", async () => {
         const res = await request(app).post("/auth/register").send(user);
         const userPwd = user.password;
         const encryptedPwd = res.body.password;

         expect(res.headers["content-type"]).toMatch(/json/);
         expect(res.status).toEqual(201);
         expect(await passwordCheck(userPwd, encryptedPwd)).toEqual(true);
         expect(fieldsCheck(res.body, fields)).toEqual(true);
      });

      test("User cannot register with registered email", async () => {
         const res = await request(app).post("/auth/register").send(user);

         expect(res.status).toEqual(409);
         expect(res.text).toEqual("User already exists. Please login.");
      });

      test("New user should be able to login after registration", async () => {
         const res = await request(app).post("/auth/login").send(user);
         const expectedFieldsReturned = fieldsCheck(res.body, fields);

         expect(res.headers["content-type"]).toMatch(/json/);
         expect(res.status).toEqual(200);
         expect(expectedFieldsReturned).toEqual(true);
         user = expectedFieldsReturned ? res.body : user;
      });
   });

   describe("Logged in user can view pages that require auth", () => {
      test("Logged in user can view their profile.", async () => {
         const res = await request(app).get("/users").send(user);
         console.log("RQST: ", res.body);
         const expectedFieldsReturned = fieldsCheck(res.body, fields);

         expect(res.status).toEqual(200);
         expect(expectedFieldsReturned).toEqual(true);
         // expect(res.headers["content-type"]).toMatch(/json/);
      });

      test("Logged in user can view their orders.", async () => {
         const res = await request(app).get("/orders").send(user);

         expect(res.status).toEqual(200);
         // expect(res.headers["content-type"]).toMatch(/json/);
      });

      test("Logged in user can view their cart.", async () => {
         const res = await request(app).get("/carts").send(user);

         expect(res.status).toEqual(200);
         // expect(res.headers["content-type"]).toMatch(/json/);
      });
   });
});
