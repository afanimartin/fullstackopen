import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = (event) => {
    if (event.key === "Enter") {
      const noteObject = {
        id: uuidv4(),
        content: newNote,
        completed: false,
      };
      axios.post("http://localhost:3001/notes", noteObject).then((response) => {
        if (response.status === 201) {
          setNotes(notes.concat(response.data));
          setNewNote("");
        }
      });
    }
  };

  // this event-handler syncs the changes made to the input element
  // with the App component's state since the App component now
  // controls the behaviour of the input element
  const handleNewNote = (event) => {
    // no default action occurs on an input element
    // so no need to call event.preventDefault()
    setNewNote(event.target.value);
  };
  return (
    <input
      type="text"
      value={newNote}
      onChange={handleNewNote}
      onKeyDown={addNote}
      placeholder="Enter note and press 'ENTER'"
    />
  );
};

export default Form;
