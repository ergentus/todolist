import React, {useEffect, useState} from 'react'
import {TodolistApi} from '../../api/todolist-api'

export default {
	title: 'API',
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		TodolistApi.getTodolist().then((res) => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'RTK'

		TodolistApi.createTodolist(title)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoId = '8126a0ab-9de2-4a1d-a86e-4e01372e37cf'

		TodolistApi.deleteTodolist(todoId)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoId = '13a6490f-72e5-48f8-9654-b57f6abf1591'
		const title = 'REreRERERRERERE'

		TodolistApi.updateTodolist(todoId, title)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

