import React, { useState } from 'react';
import '../App.css';

const listTypeToTitle = {
	completed: 'Completed',
	pending: 'Pending'
};
function App() {
	const [ currentTodo, setCurrentTodo ] = useState('');
	const [ pendingTodos, setPendingTodos ] = useState([]);
	const [ completedTodos, setCompletedTodos ] = useState([]);

	function onKeyDown(e) {
		if (e.key === 'Enter' && currentTodo.trim()) {
			setPendingTodos([ ...pendingTodos, currentTodo ]);
			setCurrentTodo('');
		}
	}

	function deleteTodo(todoIndex, targetList) {
		const targetTodoList = targetList === 'pending' ? pendingTodos : completedTodos;
		const setter = targetList === 'pending' ? setPendingTodos : setCompletedTodos;

		const filteredTodos = targetTodoList.filter((_, index) => todoIndex !== index);

		setter(filteredTodos);
	}

	function completeTodo(todoIndex) {
		const targetTodo = pendingTodos[todoIndex];

		setCompletedTodos([ ...completedTodos, targetTodo ]);
		deleteTodo(todoIndex, 'pending');
	}

	return (
		<div className="app">
			<div className="title">
				<h1>Todo</h1>
			</div>
			<input
				type="text"
				placeholder="Add todo..."
				value={currentTodo}
				onChange={(e) => setCurrentTodo(e.target.value)}
				onKeyDown={onKeyDown}
			/>
			<TodoList listType="pending" completeTodo={completeTodo} deleteTodo={deleteTodo} todos={pendingTodos} />
			<TodoList listType="completed" deleteTodo={deleteTodo} todos={completedTodos} />
		</div>
	);
}

function TodoList({ listType, completeTodo, deleteTodo, todos }) {
	return (
		<div className="todosListContainer">
			<div className={todos.length > 0 ? 'normalListTitle' : 'dimmedListTitle'}>
				<h2>{listType === 'pending' ? listTypeToTitle.pending : listTypeToTitle.completed}</h2>
			</div>
			{todos.map((todo, index) => (
				<div className="todoItem" key={index}>
					<span>{todo}</span>
					<div className="buttons">
						{listType === 'completed' ? null : (
							<span className="complete" onClick={() => completeTodo(index)}>
								<img src="https://img.icons8.com/flat_round/25/000000/checkmark.png" alt="icon" />
							</span>
						)}
						<span onClick={() => deleteTodo(index, listType)}>
							<img src="https://img.icons8.com/flat_round/25/000000/delete-sign.png" alt="icon" />
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
