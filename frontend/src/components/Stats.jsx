const Stats = ({ notes }) => {
  const completedNotes = notes.filter((note) => note.isComplete);
  const unCompletedNotes = notes.filter((note) => !note.isComplete);

  return (
    <div className="stats">
      <p><strong>Completed:</strong> {completedNotes.length}</p>
      <p><strong>Uncompleted:</strong> {unCompletedNotes.length}</p>
    </div>
  );
};

export default Stats