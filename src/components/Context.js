import { createContext } from 'react';

export const TasksContext = createContext({
  view: 'not-completed',
  setView: () => {},
});
