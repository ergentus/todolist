import axios from 'axios'

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type TaskType = {
	id: string
	title: string
	status: TaskStatuses
	todoListId: string
	description: string
	startDate: string
	deadline: string
	addedDate: string
	order: number
	priority: TaskPriorities
}

type ResponseType<T = {}> = {
	resultCode: number
	fieldsErrors: []
	messages: string[],
	data: T
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low= 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}

type GetTasksResponseType = {
	items: TaskType[]
	totalCount: number
	error: string | null
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {'API-KEY': 'd76d38ca-205c-4c62-971a-fbc3417a68fc'},
})

export const TodolistApi = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
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
		return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, title: string) {
		return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
	},
}