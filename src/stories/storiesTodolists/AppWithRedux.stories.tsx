import {Meta, StoryObj} from '@storybook/react'
import AppWithRedux from '../../AppWithRedux'
import {ReduxStoreProviderDecorator} from './decorators/reduxStoreProviderDecorator'

const meta: Meta<typeof AppWithRedux> = {
	title: 'TODOLISTS/AppWithRedux',
	component: AppWithRedux,

	tags: ['autodocs'],
	decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof AppWithRedux>


export const AppWithReduxStory: Story = {}




