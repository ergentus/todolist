import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type TodoListProbsType = {
   title: string
   tasks: TaskType[]
   removeTask: (taskId: string) => void
   listFilter: (name: FilterValuesType) => void
   addTask: (title: string) => void
}

export const TodoList = (props: TodoListProbsType): JSX.Element => {

   let isAllTasksNotIsDone = 'todolist-empty'
   for (let i = 0; i < props.tasks.length; i++) {
      if (props.tasks[i].isDone) {
         isAllTasksNotIsDone = 'todolist'
         break;
      }
   }

   const todoListItem: JSX.Element[] = props.tasks.map((task: TaskType) => {

      const removeTaskHandler = () => props.removeTask(task.id)

      return (
         <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={removeTaskHandler}>x</button>
         </li>
      )
   })

   const [title, setTitle] = useState<string>('')

   const maxTitleLength = 20
   const recommendedTitleLength = 10
   const isAddTaskPossible: boolean = title.length === 0 || title.length > maxTitleLength

   const addTaskHandler = () => {
      props.addTask(title)
      setTitle('')
   }
   const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
   const onEnterDownTaskHandler = isAddTaskPossible
      ? undefined
      : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

   const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
      <div style={{ color: 'yellow' }}>Title should be shorter</div>
   const longTitleErrorMessage = title.length > maxTitleLength &&
      <div style={{ color: 'red' }}>Title should is too long</div>

   return (
      <div className={isAllTasksNotIsDone} >
         <h3>{props.title}</h3>
         <div>
            <input
               placeholder='Enter task title, please'
               value={title}
               onChange={setLocalTitleHandler}
               onKeyDown={onEnterDownTaskHandler}
            />
            <button
               onClick={addTaskHandler}
               disabled={isAddTaskPossible}>+
            </button>
            {longTitleWarningMessage}
            {longTitleErrorMessage}
         </div>
         <ul>
            {todoListItem}
         </ul>
         <div>
            <button onClick={() => props.listFilter('all')}>All</button>
            <button onClick={() => props.listFilter('active')}>Active</button>
            <button onClick={() => props.listFilter('completed')}>Completed</button>
         </div>
      </div >
   )
}

