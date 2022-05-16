import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("routes", () => {
   let mongoServer;

   beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
   });

   afterAll(async () => {
      await mongoose.disconnect();
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
