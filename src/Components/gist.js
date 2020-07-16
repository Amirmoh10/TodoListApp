import React from "react";

function App() {
  const [typedInTodo, setTypedInTodo] = useState("");
  const [pendingTasks, setpendingTasks] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);

  function onKeyDown(e) {
    if (e.key === "Enter" && typedInTodo.trim()) {
      setpendingTasks([...pendingTasks, typedInTodo]);
      setTypedInTodo("");
    }
  }

  function completeTodo(taskIndex) {
    const pendingTask = pendingTasks[taskIndex];
    setcompletedTasks([...completedTasks, pendingTask]);
    deleteTodo(taskIndex, "pending");
  }

  function deleteTodo(taskIndex, taskSection) {
    const taskList = taskSection === "pending" ? pendingTasks : completedTasks;
    const setter = taskList === pendingTasks ? setpendingTasks : setcompletedTasks;
    const filteredTasks = taskList.filter((_, index) => taskIndex !== index);
    setter(filteredTasks);
  }

  const PendingSection = () => {
    return (
      <div className="pendingSection">
        <h2>Pending</h2>
        {pendingTasks.map((todoTask, index) => (
          <div key={index} className="todoItem">
            <p>{todoTask}</p>
            <div className="buttons">
              <span className="checkButton" onClick={() => completeTodo(index)}>
                <img
                  src="https://img.icons8.com/flat_round/25/000000/checkmark.png"
                  alt="icon"
                />
              </span>
              <span onClick={() => deleteTodo(index, "pending")}>
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
    
  };

  return (
    <div className="app">
      <div className="title">
        <h1>Todo</h1>
      </div>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => setTypedInTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="sectionsContainer">
        <PendingSection />
      </div>
    </div>
  );
}

export default App;
