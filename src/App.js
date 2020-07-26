import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

const sectionTypeTitle = {
  completed: "Completed",
  pending: "Pending",
};

function App() {
  const [typedInTodo, settypedInTodo] = useState("");
  const [pendingTodos, setpendingTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);

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
      <h1 className="title"> Todo </h1>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => settypedInTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="sectionsContainer">
        <div className="pendingSection">
          <TodoList
            sectionTitle="pending"
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            sectionList={pendingTodos}
          />
        </div>
        <div className="completeSection">
          <TodoList
            sectionTitle="completed"
            sectionList={completedTodos}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

function TodoList({ sectionTitle, completeTodo, deleteTodo, sectionList }) {
  return (
    <>
      <h2
        className={
          sectionList.length > 0 ? "boldSectionTitle" : "dimmedSectiontTitle"
        }
      >
        {sectionTitle === "pending"
          ? sectionTypeTitle.pending
          : sectionTypeTitle.completed}
      </h2>
      <div className="todoContainer">
        {sectionList.map((todo, index) => (
          <div className="todoItem" key={index}>
            <span> {todo} </span>
            {sectionTitle === "pending" ? (
              <div className="pendingSectionButtons">
                <span
                  className="completeButton"
                  onClick={() => completeTodo(index)}
                >
                  <i class="fas fa-check"></i>
                </span>
                <span
                  className="deleteButton"
                  onClick={() => deleteTodo(index, sectionTitle)}
                >
                  <i class="fas fa-times"></i>
                </span>
              </div>
            ) : (
              <div className="CompleteSectionButton">
                <span
                  className="deleteButton"
                  onClick={() => deleteTodo(index, sectionTitle)}
                >
                  <i class="fas fa-times"></i>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

TodoList.propTypes = {
  sectionTitle: PropTypes.oneOf(["pending", "completed"]).isRequired,
  completeTodo: PropTypes.func,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.string),
};

export default App;
