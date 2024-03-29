import {Meta, StoryObj} from '@storybook/react'
import {EditableSpan} from '../../EditableSpan'
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof EditableSpan> = {
	title: 'TODOLISTS/EditableSpan',
	component: EditableSpan,
	tags: ['autodocs'],

	argTypes: {
		value: {
			description: 'Start value empty. Add value push button set string.',
		},
		onChange: {
			description: 'Value EditableSpan changed',
		},
	},
}

export default meta
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
	args: {
		value: 'Default Value',
		onChange: action('Value EditableSpan changed'),
	},
}
