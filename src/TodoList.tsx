import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodoListPropsType = {
	filter: FilterValuesType
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	listFilter: (name: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export const TodoList = (props: TodoListPropsType): JSX.Element => {

	let isAllTasksNotIsDone = 'todolist-empty'
	for (let i = 0; i < props.tasks.length; i++) {
		if (props.tasks[i].isDone) {
			isAllTasksNotIsDone = 'todolist'
			break;
		}
	}

	const todoListItem: JSX.Element[] = props.tasks.map((task: TaskType) => {
		const removeTaskHandler = () => props.removeTask(task.id)
		const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskStatus(task.id, e.currentTarget.checked)
		}

		return (
			<li key={task.id}>
				<input
					onChange={changeTaskStatus}
					type="checkbox"
					checked={task.isDone}/>
				<span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
				<button onClick={removeTaskHandler}>x</button>
			</li>
		)
	})

	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const maxTitleLength = 20
	const recommendedTitleLength = 10
	const isAddTaskPossible: boolean = title.length === 0 || title.length > maxTitleLength || error

	const addTaskHandler = () => {
		const trimmedTitle = title.trim()
		if (trimmedTitle) {
			props.addTask(trimmedTitle)
		} else {
			setError(true)
		}
		setTitle('')
	}
	const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
		setError(false)
	}
	const onEnterDownTaskHandler = isAddTaskPossible
		? undefined
		: (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

	const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
      <div style={{color: 'yellow'}}>Title should be shorter</div>
	const longTitleErrorMessage = title.length > maxTitleLength &&
      <div style={{color: 'red'}}>Title should is too long</div>
	const errorMessage = error && <div style={{color: 'hotpink'}}>Title is hard required</div>

	return (
		<div className={isAllTasksNotIsDone}>
			<h3>{props.title}</h3>
			<div>
				<input
					className={error ? 'input-error' : ''}
					placeholder='Enter task title, please'
					value={title}
					onChange={setLocalTitleHandler}
					onKeyDown={onEnterDownTaskHandler}
				/>
				<button
					onClick={addTaskHandler}
					disabled={isAddTaskPossible}>+
				</button>
				{longTitleWarningMessage}
				{longTitleErrorMessage}
				{errorMessage}
			</div>
			<ul>
				{todoListItem}
			</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn-active' : ''}
					onClick={() => props.listFilter('all')}>All
				</button>
				<button
					className={props.filter === 'active' ? 'btn-active' : ''}
					onClick={() => props.listFilter('active')}>Active
				</button>
				<button
					className={props.filter === 'completed' ? 'btn-active' : ''}
					onClick={() => props.listFilter('completed')}>Completed
				</button>
			</div>
		</div>
	)
}