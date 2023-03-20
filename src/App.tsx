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

	const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
		setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
	}

	const getFiltredTasksForRender = (taskList:TaskType[], filterValue: FilterValuesType ) => {
		switch (filterValue) {
			case 'active':
				return taskList.filter(t => !t.isDone)
			case 'completed':
				return taskList.filter(t => t.isDone)
			default:
				return taskList
		}
	}
	// let tasksForRender: TaskType = getFiltredTasksForRender(tasks, filter)

	return (
		<div className="App">
			<TodoList
				title={'What to learn'}
				tasks={getFiltredTasksForRender(tasks,filter)}
				filter={filter}
				removeTask={removeTask}
				addTask={addTask}
				listFilter={listFilter}
				changeTaskStatus={changeTaskStatus}
			/>
		</div>
	);
}

export default App;
