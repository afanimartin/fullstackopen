import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addNote = (event) => {
    if (event.key === "Enter") {
      const todoObject = {
        content: newTodo,
        user: "6673f64d6703bf864bcd4194"
      };
      axios.post("http://localhost:3001/api/todos", todoObject).then((response) => {
        if (response.status === 201) {
          setTodos(todos.concat(response.data));
          setNewTodo("");
        }
      });
    }
  };

  // this event-handler syncs the changes made to the input element
  // with the App component's state since the App component now
  // controls the behaviour of the input element
  const handleNewTodo = (event) => {
    // no default action occurs on an input element
    // so no need to call event.preventDefault()
    setNewTodo(event.target.value);
  };
  return (
    <input
      type="text"
      value={newTodo}
      onChange={handleNewTodo}
      onKeyDown={addNote}
      placeholder="Enter note and press 'ENTER'"
    />
  );
};

export default Form;
