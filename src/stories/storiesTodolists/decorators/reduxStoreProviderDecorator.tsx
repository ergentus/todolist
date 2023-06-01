import React from 'react'
import {Provider} from 'react-redux'
import {AppRootStateType} from '../../../state/store'
import {tasksReducer} from '../../../state/tasks-reducer'
import {todolistsReducer} from '../../../state/todolists-reducer'
import {combineReducers, legacy_createStore} from 'redux'
import {TaskPriorities, TaskStatuses} from '../../../api/todolist-api'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
})

const initialGlobalState: AppRootStateType = {
	todolists: [
		{id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
		{id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
	],
	tasks: {
		['todolistId1']: [
			{
				id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
			{
				id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
			{
				id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
		],
		['todolistId2']: [
			{
				id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
			{
				id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
			{
				id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
			},
		],
	},
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}