import {TasksStateType, TodolistType} from '../App'
import {v1} from 'uuid'
import {TaskType} from '../Todolist'
import {addTodolistACType, removeTodolistACType} from './todolists-reducer'

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTasktTitleACType = ReturnType<typeof changeTaskTitleAC>

export type TaskActionsType =
	removeTaskACType
	| addTaskACType
	| changeTaskStatusACType
	| changeTasktTitleACType
	| addTodolistACType
	| removeTodolistACType

const initialState:TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return {
				...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId),
			}
		case 'ADD-TASK':
			const newTaskId = v1()
			const newTask: TaskType = {id: newTaskId, title: action.payload.title, isDone: false}
			return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
		case 'CHANGE-TASK-STATUS':
			return {
				...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
					? {...t, isDone: action.payload.isDone}
					: t),
			}
		case 'CHANGE-TASK-TITLE':
			return {
				...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
					? {...t, title: action.payload.title}
					: t),
			}

		case 'ADD-TODOLIST':
			return {...state, [action.payload.todolistId]: []}

		case 'REMOVE-TODOLIST':
			// const {[action.payload.todolistId]: deletedTodoList, ...rest} = state
			// return rest
			delete state[action.payload.todolistId]
			return {...state}

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: 'REMOVE-TASK',
		payload: {taskId, todolistId},
	} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
	return {
		type: 'ADD-TASK',
		payload: {title, todolistId},
	} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
	return {
		type: 'CHANGE-TASK-STATUS',
		payload: {taskId, isDone, todolistId},
	} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		payload: {taskId, title, todolistId},
	} as const
}
