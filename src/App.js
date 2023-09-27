import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <div className="list-wrapper">
        <div className="list">
          <h1>My To-Do List</h1>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
