import React from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
   id: number
   title: string
   isDone: boolean
}

type TodoListProbsType = {
   title: string
   tasks: TaskType[]
   removeTask: (taskId: number) => void
   listFilter: (name: FilterValuesType) => void
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
      return (
         <li>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={() => { props.removeTask(task.id) }}>x</button>
         </li>
      )
   })

   return (
      <div className={isAllTasksNotIsDone} >
         <h3>{props.title}</h3>
         <div>
            <input />
            <button>+</button>
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

