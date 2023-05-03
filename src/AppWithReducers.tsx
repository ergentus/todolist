import React, {Reducer, useReducer} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import ButtonAppBar from './ButtonAppBar'
import {Container, Grid, Paper} from '@mui/material'
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistActionsType, todolistsReducer} from './state/todolists-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskActionsType, tasksReducer} from './state/tasks-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}


function AppWithReducers() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistType[], TodolistActionsType>>(todolistsReducer, [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, TaskActionsType>>(tasksReducer, {
		[todolistId1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
		],
		[todolistId2]: [
			{id: v1(), title: 'Milk', isDone: true},
			{id: v1(), title: 'React Book', isDone: true},
		],
	})

	function removeTask(id: string, todolistId: string) {
		dispatchTasks(removeTaskAC(id, todolistId))
	}
	function addTask(title: string, todolistId: string) {
		dispatchTasks(addTaskAC(title, todolistId))
	}
	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
	}
	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
	}

	function removeTodolist(id: string) {
		const action = removeTodolistAC(id)
		dispatchTodolists(action)
		dispatchTasks(action)
	}
	function changeTodolistTitle(id: string, title: string) {
		dispatchTodolists(changeTodolistTitleAC(id, title))
	}
	function addTodolist(title: string) {
		const action = addTodolistAC(title)
		dispatchTodolists(action)
		dispatchTasks(action)
	}
	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatchTodolists(changeFilterAC(value, todolistId))
	}

	return (
		<div className="App">
			<ButtonAppBar/>
			<Container fixed>
				<Grid container style={{padding: '20px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>
				<Grid container spacing={3}>
					{
						todolists.map(tl => {
							let allTodolistTasks = tasks[tl.id]
							let tasksForTodolist = allTodolistTasks

							if (tl.filter === 'active') {
								tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
							}
							if (tl.filter === 'completed') {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
							}

							return <Grid item key={tl.id}>
								<Paper elevation={5} style={{padding: '10px'}}>
									<Todolist
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducers
