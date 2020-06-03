import React from "react";
import PendingTodosContainer from "./PendingTodos/PendingTodosContainer";
import CompletedTodosContainer from "./CompletedTodos/CompletedTodosContainer";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PendingTodos: [
        {
          todoName: "buy milk",
          checked: false,
          id: uuidv4(),
        },
      ],
      CompletedTodos: [],
    };
  }
  todoChange = (id) => {
    this.setState({
      PendingTodos: this.state.PendingTodos.filter((todo) => {
        return todo.id !== id;
      }),

      CompletedTodos: this.state.CompletedTodos.concat(
        this.state.PendingTodos.filter((todo) => {
          return todo.id === id;
        })
      ),
    });
  };

  removeTodoItem = (id) => {
    this.setState({
      PendingTodos: this.state.PendingTodos.filter((todo) => {
        return todo.id !== id;
      }),
    });
  };

  addTodoItem = (event, value) => {
    if (event.key === "Enter") {
      console.log(this.state.CompletedTodos);
      this.setState({
        PendingTodos: this.state.PendingTodos.concat({
          todoName: value,
          checked: false,
          id: uuidv4(),
        }),
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>todolist</h1>
        <input
          type="text"
          onKeyDown={(event, value) =>
            this.addTodoItem(event, event.target.value)
          }
        />

        <h2>Pending</h2>
        <div style={{ borderStyle: "groove" }}>
          <PendingTodosContainer
            PendingTodos={this.state.PendingTodos}
            todoChange={this.todoChange}
            removeTodoItem={this.removeTodoItem}
          />
        </div>
        <h2>Completed</h2>
        <div style={{ borderStyle: "groove" }}>
          <CompletedTodosContainer
            CompletedTodos={this.state.CompletedTodos}
            todoChange={this.todoChange}
            removeTodoItem={this.removeTodoItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
