import React, {ChangeEvent} from 'react'
import {Checkbox} from '@mui/material'

type SuperCheckBoxPropsType = {
	callBack: (newIsDoneValue: boolean) => void
	isDone: boolean
}


const SuperCheckBox = (props: SuperCheckBoxPropsType) => {

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.callBack(e.currentTarget.checked)
	}

	return (
		<Checkbox onChange={onChangeHandler} checked={props.isDone}/>
	)
}

export default SuperCheckBox