import { test, describe } from "node:test";
import assert from "node:assert";

import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../src/controllers/Todo.js";

describe("test todo controller", () => {
  test("create new todo", async () => {
    await createTodo({content: "this is a new todo item"});
    const todos = await getAllTodos()

    assert.strictEqual(todos.length, 1);
  });
});
