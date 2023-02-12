import { createContext, useState } from 'react'

export const TasksContext = createContext({
  views: ['not-completed'],
  setView: () => {},
  isUpdated: '',
  setIsUpdated: () => {},
  taskFilter: [],
  setTaskFilter: () => {},
  user: null,
  setUser: () => {},
})

export const TasksProvider = ({ children }) => {
  const [views, setViews] = useState(['not-completed'])
  const [isUpdated, setIsUpdated] = useState('')
  const [taskFilter, setTaskFilter] = useState([])
  const [user, setUser] = useState(null)

  const value = {
    views,
    setViews,
    isUpdated,
    setIsUpdated,
    taskFilter,
    setTaskFilter,
    user,
    setUser,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
