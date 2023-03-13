import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
	console.log(v1());

	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: v1(), title: "HTML & CSS", isDone: true },
		{ id: v1(), title: "CSS & SCSS", isDone: true },
		{ id: v1(), title: "ES6/TS", isDone: false },
		{ id: v1(), title: "REDUX", isDone: false }
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForRender: TaskType[] = tasks
	if (filter === 'active') tasksForRender = tasks.filter((t) => t.isDone === false)
	if (filter === 'completed') tasksForRender = tasks.filter((t) => t.isDone === true)

	const listFilter = (name: FilterValuesType) => {
		setFilter(name)
	}

	const removeTask = (taskId: string) => {
		setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
	}

	const addTask = (title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks([newTask, ...tasks])
	}

	return (
		<div className="App">
			<TodoList
				title={'What to learn'}
				tasks={tasksForRender}
				removeTask={removeTask}
				addTask={addTask}
				listFilter={listFilter} />
		</div>
	);
}

export default App;
