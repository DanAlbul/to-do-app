import { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { TasksList } from './components/TaskList';
import { TasksManagement } from './components/TasksManagement';
import { TasksContext } from './components/Context';

const temp = [
  {
    content: 'Meditate for 12 minutes',
    completed: false,
    category: 'personal-cat',
    id: '001',
  },
  {
    content: 'Take pills and vitamines',
    completed: false,
    category: 'health-cat',
    id: '002',
  },
  {
    content: 'Plan your day in to-do app',
    completed: true,
    category: 'work-cat',
    id: '003',
  },
];

export const ToDoApp = ({ tasks }) => {
  const [view, setView] = useState('not-completed');
  const [isUpdated, setIsUpdated] = useState('');
  const value = { view, setView, isUpdated, setIsUpdated };

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
  //window.localStorage.setItem('TASKS_LIST', JSON.stringify(temp));
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || temp;
  console.log('here 1');
  return <ToDoApp tasks={TASKS} />;
};
