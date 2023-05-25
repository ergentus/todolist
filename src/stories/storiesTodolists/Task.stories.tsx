import {Meta, StoryObj} from '@storybook/react'
import {Task} from '../../Task'
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof Task> = {
	title: 'TODOLISTS/Task',
	component: Task,
	tags: ['autodocs'],

	args: {
		changeTaskStatus: action('changeTaslTitle'),
		changeTaskTitle: action('changeTaslStatus'),
		removeTask: action('removeTask'),
		task: {id: '1', isDone: false, title: 'JS'},
		todolistId: '01',
	},
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDone: Story = {}

export const TaskIsDone: Story = {
	args: {
		task: {id: '1', isDone: true, title: 'J7'},
	},
}
