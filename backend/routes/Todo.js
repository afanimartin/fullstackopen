import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/Todo.js";

const todoRouter = express.Router()

todoRouter.post("/", async (req, res) => {
  const requestBody = req.body;
  if (requestBody.content.trim() === "" || requestBody.content === undefined) {
    res.status(204).end();
  } else {
    const todo = {
      content: requestBody.content,
      isComplete: false,
    };
    await createTodo(todo);
    res.status(201).end();
  }
});

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await getAllTodos();
    console.log(todos.length);
    res
      .status(200)
      .json({ status: "success", length: todos.length, todos: todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: "error" });
  }
});

todoRouter.get("/:id", async (req, res) => {
  const todoId = req.params.id;
  const foundTodo = await getTodo(todoId);
  if (foundTodo) {
    console.log(foundTodo);
    res.status(200).json({ status: "success", todo: foundTodo }).end();
  } else {
    res.status(404).end();
  }
});

todoRouter.put("/:id", async (req, res) => {
  const requestBody = req.body;
  const todoId = req.params.id;

  const updatedTodo = {
    id: todoId,
    content: requestBody.content,
    isComplete: requestBody.isComplete,
  };
  await updateTodo(updatedTodo);
  res
    .status(200)
    .json({ status: "success", message: "todo updated successfully." })
    .end();
});

todoRouter.delete("/:id", async (req, res) => {
  const todoId = req.params.id;
  await deleteTodo(todoId);
  res
    .status(204)
    .json({
      status: "success",
      message: `todo with id ${todoId} deleted successfully.`,
    })
    .end();
});

export default todoRouter;