import React, {useCallback, useEffect} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, TodolistDomainType} from './state/todolists-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {TaskStatuses, TaskType, TodolistApi} from './api/todolist-api'

export type TasksStateType = {
	[key: string]: TaskType[]
}

function AppWithRedux() {

	useEffect(() => {
		TodolistApi.getTodolists()
			.then((res) => {
				return res.data
			})
	}, [])

	const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const removeTask = useCallback(function (id: string, todolistId: string) {
		const action = removeTaskAC(id, todolistId)
		dispatch(action)
	}, [dispatch])

	const addTask = useCallback(function (title: string, todolistId: string) {
		const action = addTaskAC(title, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
		const action = changeTaskStatusAC(id, status, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
		const action = changeTaskTitleAC(id, newTitle, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
		const action = changeTodolistFilterAC(todolistId, value)
		dispatch(action)
	}, [dispatch])

	const removeTodolist = useCallback(function (id: string) {
		const action = removeTodolistAC(id)
		dispatch(action)
	}, [dispatch])

	const changeTodolistTitle = useCallback((id: string, title: string) => {
		const action = changeTodolistTitleAC(id, title)
		dispatch(action)
	}, [dispatch])

	const addTodolist = useCallback((title: string) => {
		const action = addTodolistAC(title)
		dispatch(action)
	}, [dispatch])

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{padding: '20px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>
				<Grid container spacing={3}>
					{
						todolists.map(tl => {
							return <Grid item key={tl.id}>
								<Paper style={{padding: '10px'}}>
									<Todolist
										id={tl.id}
										title={tl.title}
										tasks={tasks[tl.id]}
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

export default AppWithRedux
