import {Meta, StoryObj} from '@storybook/react'
import {Task} from '../../Task'
import {action} from '@storybook/addon-actions'
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api'


const meta: Meta<typeof Task> = {
	title: 'TODOLISTS/Task',
	component: Task,
	tags: ['autodocs'],

	args: {
		changeTaskStatus: action('changeTaslTitle'),
		changeTaskTitle: action('changeTaslStatus'),
		removeTask: action('removeTask'),
		task: {id: '1', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1', description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
	},
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDone: Story = {}

export const TaskIsDone: Story = {
	args: {
		task: {id: '1', status: TaskStatuses.Completed, title: 'JS', todoListId: 'todolistId1', description: '',
	startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
	},
}
