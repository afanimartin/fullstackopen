import { test, expect, beforeAll, afterAll } from "vitest";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import Todo from "../src/models/todo.js";

const api = supertest(app);

beforeAll(async () => {
  await Todo.deleteMany({});
  let todoObject = new Todo({
    content: "getting started with testing in nodejs",
  });
  await todoObject.save();
});

test("response type is json", async () => {
  await api
    .get("/api/todos")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return 1 as number of todos saved", async () => {
  const response = await api.get("/api/todos");
  expect(response.body.length).toBe(1);
});

test("first todo is about getting started with testing in nodejs", async () => {
  const response = await api.get("/api/todos");
  const contents = response.body.map((e) => e.content);
  expect(
    contents[0].includes("getting started with testing in nodejs")
  ).toBe(true)
});

afterAll(async () => {
  await mongoose.connection.close();
});
