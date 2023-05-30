import axios from 'axios'

export type TodolistType = {
	id: string
	title: string
	addedDate: Date
	order: number
}

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: Date
	deadline: Date
	id: string
	todoListId: string
	order: number
	addedDate: Date
}

type ResponseType<T = {}> = {
	resultCode: number
	fieldsErrors: []
	messages: string[],
	data: T
}

type GetTasksResponseType = {
	items: TaskType[]
	totalCount: number
	error: string | null
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {'API-KEY': 'd76d38ca-205c-4c62-971a-fbc3417a68fc'}
})

export const TodolistApi = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{item: TodolistType }>>('todo-lists', {title})
	},
	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},
	updateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
	},

	getTasks(todolistId: string) {
		return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, title: string) {
		return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
	},
}