const Stats = ({ notes }) => {
  const completedNotes = notes.filter((note) => note.completed);
  const unCompletedNotes = notes.filter((note) => !note.completed);

  return (
    <div className="stats">
      <p>Completed: {completedNotes.length}</p>
      <p>Uncompleted: {unCompletedNotes.length}</p>
    </div>
  );
};

export default Stats