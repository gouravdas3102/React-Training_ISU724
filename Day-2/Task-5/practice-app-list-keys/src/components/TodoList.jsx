import { useState } from "react";

// Function Component that renders the list items by index and addition of new item on Button click
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Learn React" },
    { id: 2, task: "Build a project" },
    { id: 3, task: "Practice daily" }
  ]);

  const addTodoAtStart = () => {
    const newTodo = {
      id: Date.now(),
      task: "Enjoy Coding!"
    };

    // Add at beginning
    setTodos([newTodo, ...todos]);
  };

  return (
    <div>
      <h2>Using Index as Key </h2>

      <button onClick={addTodoAtStart}>
        Add Item at Beginning
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;