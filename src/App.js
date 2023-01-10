import { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { TasksList } from './components/TaskList';
import { TasksManagement } from './components/TasksManagement';
import { TasksContext } from './components/Context';
//import TASKS from './data/tasks.json';

export const ToDoApp = ({ tasks }) => {
  const [view, setView] = useState('not-completed');
  const value = { view, setView };

  return (
    <>
      <TasksContext.Provider value={value}>
        <Widget />
        <TasksList tasks={tasks} />
        <TasksManagement />
      </TasksContext.Provider>
    </>
  );
};

export const App = () => {
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST'));
  return <ToDoApp tasks={TASKS} />;
};
