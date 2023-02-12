import { useContext } from 'react'
import { TasksContext } from './components/Context'
import { Widget } from './components/Widget'
import { TasksList } from './components/TaskList'
import { TasksManagement } from './components/TasksManagement'
import { TasksProvider } from './components/Context'
import { TaskFilters } from './components/Filters'

import { initializeUser, initializeTaskList } from './utils/utils.js'

export const App = () => {
  const { user, setUser } = useContext(TasksContext)

  const userDoc = JSON.parse(window.localStorage.getItem('USER_DOC'))
  if (!userDoc) setUser(initializeUser())

  initializeTaskList(userDoc)

  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || []

  return (
    <TasksProvider>
      <Widget />
      <TaskFilters />
      <TasksList TASKS={TASKS} />
      <TasksManagement />
    </TasksProvider>
  )
}
