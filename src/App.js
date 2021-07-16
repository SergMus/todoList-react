import React, { useEffect, useState } from "react";
import { Context } from "./context";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTitle] = useState("");

  useEffect(() => {
    const startArr = localStorage.getItem("todos") || [];
    if (startArr) {
      setTodos(JSON.parse(startArr));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    if (event.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false,
        },
      ]);
      setTitle("");
    }
  };

  const toggleItem = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  };
  const removeItem = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <Context.Provider value={{ removeItem, toggleItem }}>
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(event) => setTitle(event.target.value)}
            onKeyPress={addTodo}
            placeholder="Todo name"
          />
          {/* <label>Todo name</label> */}
        </div>

        <TodoList td={todos} />
      </div>
    </Context.Provider>
  );
}
