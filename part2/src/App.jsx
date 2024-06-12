import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const NoteForm = ({ newNote, handleNewNote, addNote }) => {
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

const Note = ({ note }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxPress = () => {
    note.completed = !note.completed;
    setIsCompleted(note.completed);

    axios.patch(`http://localhost:3001/notes/${note.id}`, {
      completed: note.completed,
    });
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

const Notes = ({ notes }) => {
  return (
    <>
      <ul>
        {notes.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </ul>
    </>
  );
};

const Statistics = ({ notes }) => {
  const completedNotes = notes.filter((note) => note.completed);
  const unCompletedNotes = notes.filter((note) => !note.completed);

  return (
    <div className="stats">
      <p>Completed: {completedNotes.length}</p>
      <p>Uncompleted: {unCompletedNotes.length}</p>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  });

  const addNote = (event) => {
    if (event.key === "Enter") {
      const noteObject = {
        id: uuidv4(),
        content: newNote,
        completed: false,
      };
      axios.post("http://localhost:3001/notes", noteObject).then((response) => {
        if (response.status === 201) {
          setNotes((notes) => notes.concat(response.data));
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
    <>
      <section className="mainContent">
        <Statistics notes={notes} />
        <NoteForm
          newNote={newNote}
          addNote={addNote}
          handleNewNote={handleNewNote}
        />
        <Notes notes={notes} />
      </section>
    </>
  );
};

export default App;
