import React from "react";

const CompletedTodos = (props) => {
  return (
    <div>
      <p style={{ display: "inline-block" }}>{props.todoItem.todoName}</p>
      <button
        style={{ backgroundColor: "red", color: "white", marginLeft: "5px" }}
        onClick={() => props.removeTodoItem(props.todoItem.id)}
      >
        x
      </button>
    </div>
  );
};

export default CompletedTodos;
