import express from "express";
import cors from "cors";
import todoRouter from "./routes/Todo.js";
import requestLogger from "./middleware/requestLogger.js";
import unknownEndpoint from "./middleware/unknownEndpoint.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/todos", todoRouter);

app.use(requestLogger);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
