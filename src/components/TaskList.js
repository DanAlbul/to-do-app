import { TaskItem } from './Task'
import { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { TaskFilters } from './Filters'
import { TasksContext } from './Context'

export const TasksList = ({ tasks }) => {
  const listRef = useRef(null)

  const { views, isUpdated, setIsUpdated, taskFilter } =
    useContext(TasksContext)

  const filteredTasks = useMemo(() => {
    const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || []

    if (isUpdated) {
      setTimeout(() => {
        setIsUpdated(!isUpdated)
      }, 250)
    }

    let taskList = []
    const uncompleted = views.includes('completed')

    if (taskFilter.length === 0)
      taskList = TASKS.filter((item) => item.completed === uncompleted)
    else {
      taskList = TASKS.filter(
        (item) =>
          taskFilter.includes(item.category.type) &&
          item.completed === uncompleted
      )
    }

    // console.log(taskList)

    return taskList.map((task) => {
      return (
        <li key={task.id}>
          <TaskItem
            id={task.id}
            content={task.content}
            category={task.category}
            isCompleted={task.completed}
            created={task.date_created}
          />
        </li>
      )
    })
  }, [views, isUpdated, tasks])

  /* listRef.current?.lastChild?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'end',
  }); */

  console.log('filteredTasks', filteredTasks)

  return filteredTasks.length ? (
    <div
      className={`${
        filteredTasks.length > 10 ? 'multiple-list' : ''
      } tasks_wrapper`}>
      <ul ref={listRef}>{filteredTasks}</ul>
    </div>
  ) : (
    // if user has deleted OR completed all tasks
    <div className='tasks_wrapper'>
      <h3 className='empty-header'>
        {`${
          views.includes('completed')
            ? "You don't have any completed tasks yet"
            : "You don't have any ongoing tasks yet"
        }`}
      </h3>
    </div>
  )
}
