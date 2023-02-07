import { useState, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { TasksContext } from './Context'

export const TaskItem = (props) => {
  const [completed, setCompleted] = useState(props.isCompleted)
  const [items, setItems] = useLocalStorage('TASKS_LIST', [])
  const { views, isUpdated, setIsUpdated } = useContext(TasksContext)
  const [mouseOver, setMouseOver] = useState(false)

  const handleMouseEnter = () => {
    setMouseOver(true)
  }

  const handleMouseOut = () => {
    setMouseOver(false)
  }

  function toggleStatus(e) {
    const tasks = JSON.parse(localStorage.getItem('TASKS_LIST'))
    const task = tasks.find((task) => task.id === props.id)
    task.completed = !completed

    tasks[tasks.indexOf(task)] = task

    setItems(tasks)

    setCompleted(!completed)
    setIsUpdated(Date.now())
  }

  return (
    <div
      className={`${completed ? 'completed' : ''} task-block`}
      style={
        views.includes('completed')
          ? {
              outlineColor: 'green',
              outlineStyle: 'solid',
              transition: 'text-decoration 100ms',
            }
          : {}
      }>
      {/*   <div className='task-main'> */}
      <input
        onChange={toggleStatus}
        className='task-checkbox'
        type='checkbox'
        name='task'
        checked={completed}
      />
      <label
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        className={`task${mouseOver ? ' active-task' : ''}`}
        /*  title={props.content} */
      >
        {props.content}
      </label>
      {/*  </div> */}
      <span className={'date-of-creation'}>{props.created}</span>
      <span
        className='task-category'
        style={{ backgroundColor: props.category.color }}
        datacontent={props.category.type}></span>
    </div>
  )
}

/* function showLineThrough(e) {
  e.target.style.textDecorationColor = 'black';
}

function hideLineThrough(e) {
  e.target.style.textDecorationColor = 'transparent';
}
 */
