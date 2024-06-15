import Todo from "../models/todoSchema.js";

const createTodo = async (todo) => {
  try {
    const newTodo = new Todo(todo);
    await newTodo.save();
  } catch (error) {
    console.log(error);
  }
};

const getAllTodos = async () => {
  try {
    const todos = await Todo.find({});
    return await todos;
  } catch (error) {
    console.log(error);
  }
};

const getTodo = async (id) => {
  try {
    const foundTodo = await Todo.findOne({ _id: id });
    if (foundTodo) {
      console.log("document found successfully.");
      return foundTodo;
    } else {
      console.log("there was an error finding the document.");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (todo) => {
  try {
    await Todo.findByIdAndUpdate(todo.id, todo, { new: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const deleteResult = await Todo.deleteOne({ _id: id });
    if (deleteResult.deletedCount === 1) {
      console.log("document deleted successfully.");
    } else {
      console.log("document not found.");
    }
  } catch (error) {
    console.log(error);
  }
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
