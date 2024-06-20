import Todo from "./Todo"

const Todos = ({ todos }) => {
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
};

export default Todos