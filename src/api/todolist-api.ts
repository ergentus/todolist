import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
})

export const TodolistApi = {
	getTodolist() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{item: TodolistType }>>('todo-lists', title)
	},
	updateTodolist(id: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${id}`, {title})
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseType>(`todo-lists/${id}`)
	},
}

type TodolistType = {
	id: string
	title: string
	addedDate: Date
	order: number
}

type ResponseType<T = {}> = {
	resultCode: number
	fieldsErrors: []
	messages: string[],
	data: T
}
