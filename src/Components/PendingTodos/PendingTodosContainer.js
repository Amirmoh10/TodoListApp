import React from "react";
import PendingTodo from "./PendingTodo";

const PendingTodosContainer = (props) => {
  return (
    <div>
      {props.PendingTodos.map((todoItem) => {
        return (
          <PendingTodo
            key={todoItem.id}
            todoItem={todoItem}
            todoChange={props.todoChange}
            removeTodoItem={props.removeTodoItem}
          />
        );
      })}
    </div>
  );
};

export default PendingTodosContainer;
