import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(e => e.id !== action.payload.todolistId)
		case 'ADD-TODOLIST':
			const newTodolistId = v1()
			const newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTodolistTitle, filter: 'all'}
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
			return state
	}
}

type ActionsType =
	removeTodolistACType
	| addTodolistACType
	| changeTodolistTitle
	| changeFilter

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type changeFilter = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: {todolistId},
	} as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
	return {
		type: 'ADD-TODOLIST',
		payload: {newTodolistTitle},
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