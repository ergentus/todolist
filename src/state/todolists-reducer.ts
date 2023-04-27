import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

type ActionsType =
	removeTodolistACType
	| addTodolistACType
	| changeTodolistTitleACType
	| changeFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(e => e.id !== action.payload.todolistId)
		case 'ADD-TODOLIST':
			const newTodolist: TodolistType = {
				id: action.payload.todolistId,
				title: action.payload.newTodolistTitle,
				filter: 'all'}
			return [...state, newTodolist]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(e => e.id === action.payload.todolistId
				? {...e, title: action.payload.newTodolistTitle}
				: e)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(e => e.id === action.payload.todolistId
				? {...e, filter: action.payload.value}
				: e)

		default:
			throw new Error('I don\'t understand this type')
	}
}

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: {todolistId},
	} as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
	return {
		type: 'ADD-TODOLIST',
		payload: {newTodolistTitle, todolistId: v1()},
	} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {todolistId, newTodolistTitle},
	} as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		payload: {value, todolistId},
	} as const
}