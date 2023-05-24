import type {Meta, StoryObj} from '@storybook/react'

import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {TaskWithRedux} from '../../TaskWithRedux'
import {ReduxStoreProviderDecorator} from './decorators/reduxStoreProviderDecorator'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {TaskType} from '../../Todolist'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer'
import {action} from '@storybook/addon-actions'
import {EditableSpan} from '../../EditableSpan'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
	title: 'TODOLISTS/TaskWithRedux',
	component: TaskWithRedux,
	tags: ['autodocs'],

	decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof TaskWithRedux>;


const TaskCopy = () => {
	let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
	let todolistId = 'todolistId1'

	const dispatch = useDispatch()

	const removeTask = () => {
		const action = removeTaskAC(task.id, todolistId)
		dispatch(action)
	}

	const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const action = changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId)
		dispatch(action)
	}

	const changeTaskTitle = useCallback((newTitle: string) => {
		const action = changeTaskTitleAC(task.id, newTitle, todolistId)
		dispatch(action)
	}, [dispatch, task.id, todolistId])

	return <div className={task.isDone ? 'is-done' : ''}>
		<Checkbox
			checked={task.isDone}
			color="primary"
			onChange={changeStatus}
		/>

		<EditableSpan value={task.title} onChange={changeTaskTitle}/>
		<IconButton onClick={action('removeTask')}>
			<Delete/>
		</IconButton>
	</div>
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskWithReduxStory: Story = {
	render: () => <TaskCopy/>,
}