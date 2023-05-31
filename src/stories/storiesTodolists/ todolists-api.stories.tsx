import React, {useEffect, useState} from 'react'
import {TodolistApi} from '../../api/todolist-api'

export default {
	title: 'API',
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {

		TodolistApi.getTodolists()
			.then((res) => {
				setState(res.data)
			})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState<string>('')

	const createTodolist = () => {
		TodolistApi.createTodolist(title)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
			<button onClick={createTodolist}>Create Todolist</button>
		</div>
	</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')

	const deleteTodolist = () => {
		TodolistApi.deleteTodolist(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}
	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<button onClick={deleteTodolist}>Delete Todolist</button>
		</div>
	</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState<string>('')
	const [todolistId, setTodolistId] = useState<string>('')


	const updateTodolist = () => {
		TodolistApi.updateTodolist(todolistId, title)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<input placeholder={'enter title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
			<button onClick={updateTodolist}>Update Todolist</button>
		</div>
	</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')

	const getTasks = () => {
		TodolistApi.getTasks(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}
	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<button onClick={getTasks}>Get Tasks</button>
		</div>
	</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')
	const [title, setTitle] = useState<string>('')

	const createTask = () => {
		TodolistApi.createTask(todolistId, title)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<input placeholder={'enter title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
			<button onClick={createTask}>Create Task</button>
		</div>
	</div>
}
export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [taskId, setTaskId] = useState<string>('')
	const [todolistId, setTodolistId] = useState<string>('')

	const deleteTask = () => {
		TodolistApi.deleteTask(todolistId, taskId)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<input placeholder={'enter taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
			<button onClick={deleteTask}>Create Task</button>
		</div>
	</div>
}

export const UpdateTaskTitle = () => {
	const [state, setState] = useState<any>(null)
	const [taskId, setTaskId] = useState<string>('')
	const [todolistId, setTodolistId] = useState<string>('')
	const [title, setTitle] = useState<string>('')

	const updateTask = () => {
		TodolistApi.updateTask(todolistId, taskId, title)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
			<input placeholder={'enter taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
			<input placeholder={'enter title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
			<button onClick={updateTask}>Create Task</button>
		</div>
	</div>
}