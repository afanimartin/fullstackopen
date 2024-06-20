import { useState, useEffect } from "react";
import Todos from "./components/Todos";
import Form from "./components/Form";
import Stats from "./components/Stats";

import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todos").then((response) => {
      setTodos(response.data);
    });
  });

  return (
    <>
      <section className="mainContent">
        <Stats notes={todos} />
        <Form />
        <Todos todos={todos} />
      </section>
    </>
  );
};

export default App;
