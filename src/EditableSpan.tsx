import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type IdetableSpanPropsType = {
	title: string
	onChange: (newValue: string) => void
}
const EditableSpan = (props: IdetableSpanPropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState('')

	const activateEditMode = () => {
		if (!editMode) {
			setEditMode(true)
			setTitle(props.title)
		} else {
			setEditMode(false)
			props.onChange(title)
		}
	}
	const activateEditModeEnter= (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false)
			props.onChange(title)
		}
	}
	const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


	return (
		editMode
			? <input onBlur={activateEditMode}
						onKeyDown={activateEditModeEnter}
						value={title}
						onChange={changeTitleHandler}
						autoFocus>

			</input>
			: <span onDoubleClick={activateEditMode}>{props.title}</span>
	);
};
export default EditableSpan;