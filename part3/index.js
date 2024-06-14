import express from "express";
import cors from "cors";
import requestLogger from "./utils/requestLogger.js";
import Todo from "./database/todoSchema.js";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./controllers/TodoController.js";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.post("/api/todos", async (req, res) => {
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

app.get("/api/todos", async (req, res) => {
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

app.get("/api/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const foundTodo = await getTodo(todoId);
  if (foundTodo) {
    console.log(foundTodo);
    res.status(200).json({ status: "success", todo: foundTodo }).end();
  } else {
    res.status(404).end();
  }
});

app.put("/api/todos/:id", async (req, res) => {
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

app.delete("/api/todos/:id", async (req, res) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
