import React from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';


function App(): JSX.Element {

	const tasks: TaskType[] = [
		{id: 1, title: "HTML & CSS", isDone: true},
		{id: 2, title: "CSS & SCSS", isDone: true},
		{id: 3, title: "ES6/TS", isDone: false},
	]

	return (
		<div className="App">
			<TodoList title={'What to learn'} tasks={tasks} />
		</div>
	);
}

export default App;
