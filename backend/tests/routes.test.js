import { test, after } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";

const api = supertest(app);

test("todos are returned as json", async () => {
  await api
    .get("/api/todos")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return 3 as number of todos saved", () => {
  api
    .get("/api/todos")
    .expect(200)
    .then((result) => expect(result.length, 3));
});

after(async () => {
  await mongoose.connection.close();
});
