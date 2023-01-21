import { createContext } from 'react';

export const TasksContext = createContext({
  views: ['not-completed'],
  setView: () => {},
  isUpdated: '',
  setIsUpdated: () => {},
  taskFilter: [],
  setTaskFilter: () => {},
});
