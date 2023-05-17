import React from 'react'
import {Meta, StoryObj} from '@storybook/react'
import {EditableSpan} from './EditableSpan'
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,

    tags: ['autodocs'],

    argTypes: {
        value: {
            description: 'Set start value empty string'
        },
        onChange: {
            description: 'Set start value'
        },
    },
    args: {
        onChange: action('Change value editable span'),
        value: 'HTML'
    }
}

export default meta
type Story = StoryObj<typeof EditableSpan>


export const EditableSpanStory: Story = {}