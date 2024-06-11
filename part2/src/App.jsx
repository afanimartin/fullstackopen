import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Note = ({ note }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState([]);

  const handleCheckboxPress = () => {
    note.completed = !note.completed;
    setIsCompleted(note.completed);
    setTotalCompleted((totalCompleted) => totalCompleted + 1);
  };

  return (
    <div className="note">
      <input type="checkbox" onClick={handleCheckboxPress} />
      <li style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {note.content}
      </li>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(notes => notes.concat(response.data));
    });
  }, []);

  const addNote = (event) => {
    if (event.key === "Enter") {
      const noteObject = {
        id: uuidv4(),
        content: newNote,
        completed: false,
      };
      setNotes((notes) => notes.concat(noteObject));
      setNewNote("");
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
    <>
      <section className="mainContent">
        <input
          type="text"
          value={newNote}
          onChange={handleNewNote}
          onKeyDown={addNote}
          placeholder="Enter note and press 'ENTER'"
        />
        <ul>
          {notes.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default App;
