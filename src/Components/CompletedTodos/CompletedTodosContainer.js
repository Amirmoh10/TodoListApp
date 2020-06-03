import React from "react";
import CompletedTodos from "./CompletedTodo";

const CompletedTodosContainer = (props) => {
  return (
    <div>
      {props.CompletedTodos.map((todoItem) => {
        return (
          <CompletedTodos
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

export default CompletedTodosContainer;
