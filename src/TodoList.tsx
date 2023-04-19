import React from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SuperCheckBox from './SuperCheckBox'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.id, title)
	}

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
	const onChangeHandler = (newIsDoneValue: boolean, taskId: string) => {
		props.changeTaskStatus(taskId, newIsDoneValue, props.id)
	}
	return (
		<div>
			<h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
				{/*<button onClick={removeTodolist}>x</button>*/}
				<IconButton aria-label="delete" onClick={removeTodolist}>
					<DeleteIcon/>
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask}/>
			<ul style={{padding: 0}}>
				{
					props.tasks.map(t => {
						const onClickHandler = () => props.removeTask(t.id, props.id)
						const onTitleChangeHandler = (newValue: string) => {
							props.changeTaskTitle(t.id, newValue, props.id)
						}


						return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
							{/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
							{/*<Checkbox onChange={onChangeHandler} checked={t.isDone}/>*/}
							<SuperCheckBox callBack={(newIsDoneValue) => onChangeHandler(newIsDoneValue , t.id)}
												isDone={t.isDone}/>
							<EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
							{/*<button onClick={onClickHandler}>x</button>*/}
							<IconButton aria-label="delete" onClick={onClickHandler}>
								<DeleteIcon/>
							</IconButton>
						</div>
					})
				}
			</ul>
			<div>
				<Button variant={props.filter === 'all' ? "contained":"outlined"} color="info"  onClick={onAllClickHandler}>All</Button>
				<Button variant={props.filter === 'active' ? "contained":"outlined"} color=  'info'  onClick={onActiveClickHandler}>Active</Button>
				<Button variant={props.filter === 'completed' ? "contained":"outlined"} color='info'  onClick={onCompletedClickHandler}>Completed</Button>
			</div>
		</div>
	)
}


