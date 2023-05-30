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
	useEffect(() => {
		const todolistId = '1802a73e-9c8c-45ae-937d-fb482f149bf3'

		TodolistApi.getTasks(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '1802a73e-9c8c-45ae-937d-fb482f149bf3'
		const title = 'IAMTEST'

		TodolistApi.createTask(todolistId, title)
			.then((res) => {
				console.log(res)
				setState(res.data)
			})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '1802a73e-9c8c-45ae-937d-fb482f149bf3'
		const taskId = '60c897a9-d75f-4c28-95cc-cbac05aefa1f'

		TodolistApi.deleteTask(todolistId, taskId)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '1802a73e-9c8c-45ae-937d-fb482f149bf3'
		const taskId = '7670e486-9a14-4f86-88b9-70c7b141967f'
		const title = 'ITS ME MARIO!!!'

		TodolistApi.updateTask(todolistId, taskId, title)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}