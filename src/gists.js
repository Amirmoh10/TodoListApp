import React, { useState } from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [typedInTodo, setTypedInTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  function completeTodo(todoIndex) {
    const pendingTask = pendingTodos[todoIndex];
    setCompletedTodos([...completedTodos, pendingTask]);
    deleteTodo(todoIndex, "pending");
  }

  function deleteTodo(todoIndex, targetSection) {
    const targetList =
      targetSection === "pending" ? pendingTodos : completedTodos;
    const setter =
      targetSection === "pending" ? setPendingTodos : setCompletedTodos;
    const filteredTodos = targetList.filter((_, index) => todoIndex !== index);
    setter(filteredTodos);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && typedInTodo.trim()) {
      setPendingTodos([...pendingTodos, typedInTodo]);
      setTypedInTodo("");
    }
  }

  return (
    <div className="app">
      <h1>Todo</h1>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => setTypedInTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="sectionsContainer">
        <div className="todoContainer">
          <h2>Pending</h2>
          {pendingTodos.map((todo, index) => (
            <div key={index} className="todoItem">
              <p>{todo}</p>
              <div className="buttonsSection">
                <button
                  className="transparent completeButton"
                  onClick={() => completeTodo(index)}
                >
                  <CheckOutlined className="icon" />
                </button>
                <button
                  className="transparent deleteButton"
                  onClick={() => deleteTodo(index, "pending")}
                >
                  <CloseOutlined className="icon" />
                </button>
              </div>
            </div>
          ))}
          <h2>Completed</h2>
          {completedTodos.map((todo, index) => (
            <div key={index} className="todoItem">
              <p>{todo}</p>
              <div className="buttonsSection">
                <button
                  className="transparent deleteButton"
                  onClick={() => deleteTodo(index, "completed")}
                >
                  <CloseOutlined className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
