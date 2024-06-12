import Note from "./Note"

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

export default Notes