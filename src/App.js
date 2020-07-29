import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import "./App.css";

const sectionTypeTitle = {
  completed: "Completed",
  pending: "Pending",
};

function App() {
  const [typedInTodo, settypedInTodo] = useState("");
  const [pendingTodos, setpendingTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  console.log(typedInTodo)

  function completeTodo(todoIndex) {
    const pendingTask = pendingTodos[todoIndex];
    setcompletedTodos([...completedTodos, pendingTask]);
    deleteTodo(todoIndex, "pending");
  }

  function deleteTodo(todoIndex, todoSection) {
    const targetList =
      todoSection === "pending" ? pendingTodos : completedTodos;
    const setter =
      targetList === pendingTodos ? setpendingTodos : setcompletedTodos;
    const filteredTodos = targetList.filter((_, index) => todoIndex !== index);
    setter(filteredTodos);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && typedInTodo.trim()) {
      setpendingTodos([...pendingTodos, typedInTodo]);
      settypedInTodo("");
    }
  }

  return (
    <div className="app">
      <h1 className="title">Todo</h1>

      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => settypedInTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default App;

function TodoList({ sectionTitle, completeTodo, deleteTodo, todoList }) {
  return (
    <div className="todoContainer">
      <h2
        className={
          todoList.length > 0 ? "boldSectionTitle" : "dimmedSectiontTitle"
        }
      >
        {sectionTypeTitle[sectionTitle]}
      </h2>
      <div>
        {todoList.map((todo, index) => (
          <div className="todoItem" key={index}>
            <span>{todo}</span>
            <div className="buttonsSection">
              {sectionTitle !== "pending" ? null : (
                <button
                  className="transparent completeButton"
                  onClick={() => completeTodo(index)}
                >
                  <CheckOutlined className="icon" />
                </button>
              )}
              <button
                className="transparent deleteButton"
                onClick={() => deleteTodo(index, sectionTitle)}
              >
                <CloseOutlined className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TodoList.propTypes = {
  sectionTitle: PropTypes.oneOf(["pending", "completed"]).isRequired,
  completeTodo: PropTypes.func,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.string),
};
