import { useState, useEffect } from "react";
import Notes from "./components/Notes"
import Form from "./components/Form"
import Stats from "./components/Stats"

import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todos").then((response) => {
      setNotes(response.data.todos);
    });
  });

  return (
    <>
      <section className="mainContent">
        <Stats notes={notes} />
        <Form />
        <Notes notes={notes} />
      </section>
    </>
  );
};

export default App;
