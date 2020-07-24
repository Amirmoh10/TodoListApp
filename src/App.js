import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./App.css";

const useStyles = makeStyles({
  backgroundStyle: {
    backgroundImage: "url(src/todoBackground.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
  },

  appStyle: {
    background:
      "linear-gradient(to right,rgba(120, 255, 215, 0.68), rgba(0, 121, 145, 0.68))",
    width: "500px",
    height: "720px",
    margin: "3em auto",
    borderRadius: "1.4em",
  },
  appTitleStyle: {
    width: "100%",
    marginTop: "25px",
    fontSize: "6em",
    fontFamily: "Orbitron",
    letterSpacing: "10px",
    color: "white",
  },

  inputStyle: {
    padding: "2% 0 2% 2%",
    borderStyle: "none",
    borderRadius: "1em",
    fontSize: "16px",
    fontFamily: "Orbitron",
    outline: "none",
    backgroundColor: "white",
    color: "#007991",
    letterSpacing: "3px",
    width: "100%",
    marginTop: "1em",
  },
});

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

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item container dirction="column" xs={12} className={classes.appStyle}   justify="center">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <h1 className={classes.appTitleStyle}> Todo </h1>
          <input
            type="text"
            placeholder="Add todo..."
            value={typedInTodo}
            onChange={(event) => settypedInTodo(event.target.value)}
            onKeyDown={onKeyDown}
            className={classes.inputStyle}
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
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
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
                <CheckCircleOutlineIcon onClick={() => completeTodo(index)} />
                <HighlightOffIcon
                  onClick={() => deleteTodo(index, sectionTitle)}
                />
              </div>
            ) : (
              <div className="CompleteSectionButton">
                <HighlightOffIcon
                  onClick={() => deleteTodo(index, sectionTitle)}
                />
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
