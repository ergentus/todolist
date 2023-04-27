import {TasksStateType} from '../App'
import {v1} from 'uuid'
import {TaskType} from '../Todolist'
import {addTodolistACType, removeTodolistACType} from './todolists-reducer'

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTasktTitleACACType = ReturnType<typeof changeTasktTitleAC>

type ActionsType =
	removeTaskACType
	| addTaskACType
	| changeTaskStatusACType
	| changeTasktTitleACACType
	| addTodolistACType
	| removeTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
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
			delete state[action.payload.todolistId]
			return {...state}

		default:
			throw new Error('I don\'t understand this type')
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

export const changeTasktTitleAC = (taskId: string, title: string, todolistId: string) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		payload: {taskId, title, todolistId},
	} as const
}
