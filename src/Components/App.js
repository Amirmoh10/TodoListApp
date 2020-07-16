import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

const sectionTypeTitle = {
  completed: "Completed",
  pending: "Pending",
};

function App() {
  const [typedInTodo, setCurrentTodo] = useState("");
  const [pendingTasks, setpendingTasks] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);

  function completeTodo(taskIndex) {
    const pendingTask = pendingTasks[taskIndex];
    setcompletedTasks([...completedTasks, pendingTask]);
    deleteTodo(taskIndex, "pending");
  }

  function deleteTodo(taskIndex, taskSection) {
    const taskList = taskSection === "pending" ? pendingTasks : completedTasks;
    const setter =
      taskList === pendingTasks ? setpendingTasks : setcompletedTasks;

    const filteredTasks = taskList.filter((_, index) => taskIndex !== index);

    setter(filteredTasks);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && typedInTodo.trim()) {
      setpendingTasks([...pendingTasks, typedInTodo]);
      setCurrentTodo("");
    }
  }

  function TodoList({ sectionTitle, completeTodo, deletedTodo, sectionTasks }) {
    return (
      <div className="sectionsContainer">
        <div
          className={
            sectionTasks.length > 0 ? "boldSectionTitle" : "dimmedSectiontTitle"
          }
        >
          <h2>
            {sectionTitle === "pending"
              ? sectionTypeTitle.pending
              : sectionTypeTitle.completed}
          </h2>
        </div>
        {sectionTasks.map((todo, index) => (
          <div className="todoItem" key={index}>
            <span> {todo} </span>
            <div className="buttons">
              {sectionTitle === "completed" ? null : (
                <span
                  className="checkButton"
                  onClick={() => completeTodo(index)}
                >
                  <img
                    src="https://img.icons8.com/flat_round/25/000000/checkmark.png"
                    alt="icon"
                  />
                </span>
              )}
              <span onClick={() => deletedTodo(index, sectionTitle)}>
                <img
                  src="https://img.icons8.com/flat_round/25/000000/delete-sign.png"
                  alt="icon"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  TodoList.propTypes = {
    sectionTitle: PropTypes.oneOf(["pending", "completed"]).isRequired,
    completeTodo: PropTypes.func,
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.string),
  };

  return (
    <div className="app">
      <div className="title">
        <h1> Todo </h1>
      </div>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => setCurrentTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="pendingSection">
        <TodoList
          sectionTitle="pending"
          completeTodo={completeTodo}
          deletedTodo={deleteTodo}
          sectionTasks={pendingTasks}
        />
      </div>
      <div className="completedSection">
        <TodoList
          sectionTitle="completed"
          sectionTasks={completedTasks}
          deletedTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
//

//

export default App;
// className={typedTodo.length > 0 ? "boldSectionTitle" : "dimmedSectionTitle"
// {sectionTasks.map((todo, index) => (
//   <div className="todoItem" key={index}>
//     <span> {todo} </span>{" "}
//     <div className="buttons">
//       {sectionTitle === "Completed" ? null : (
//         <span
//           className="pending"
//           onClick={() => completeTodo(index)}
//         >
//           <img
//             src="https://img.icons8.com/flat_round/25/000000/checkmark.png"
//             alt="icon"
//           />
//         </span>
//       )}{" "}
//       <span onClick={() => deletedTodo(index, sectionTitle)}>
//         <img
//           src="https://img.icons8.com/flat_round/25/000000/delete-sign.png"
//           alt="icon"
//         />
//       </span>
//     </div>
//   </div>
// ))}
