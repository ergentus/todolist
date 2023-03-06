import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: 1, title: "HTML & CSS", isDone: true },
		{ id: 2, title: "CSS & SCSS", isDone: true },
		{ id: 3, title: "ES6/TS", isDone: false },
		{ id: 4, title: "REDUX", isDone: false }
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForRender: TaskType[] = tasks
	if (filter === 'active') tasksForRender = tasks.filter((t) => t.isDone === false)
	if (filter === 'completed') tasksForRender = tasks.filter((t) => t.isDone === true)

	const listFilter = (name: FilterValuesType) => {
		setFilter(name)
	}

	const removeTask = (taskId: number) => {
		setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
	}

	return (
		<div className="App">
			<TodoList title={'What to learn'} tasks={tasksForRender} removeTask={removeTask} listFilter={listFilter} />
		</div>
	);
}

export default App;
