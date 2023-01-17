import { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { TasksList } from './components/TaskList';
import { TasksManagement } from './components/TasksManagement';
import { TasksContext } from './components/Context';
import { faker } from '@faker-js/faker';

/* const temp = [
  {
    content: 'Meditate for 12 minutes',
    completed: false,
    category: { color: '#800080', name: 'Personal' },
    id: '001',
    date_created: '05/12/2022',
  },
  {
    content: 'Take pills and vitamines',
    completed: false,
    category: { color: '#ff0000', name: 'Health' },
    id: '002',
    date_created: '21/12/2022',
  },
  {
    content: 'Plan your day in to-do app',
    completed: true,
    category: { color: '#ffa500', name: 'Work' },
    id: '003',
    date_created: '09/01/2023',
  },
];
 */
const generateTasks = () => {
  const tasks = [];
  for (let i = 0; i < 500; i++) {
    const task = {
      content: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      category: {
        color: faker.internet.color(),
        name: faker.lorem.word(),
      },
      id: faker.datatype.uuid(),
      date_created: faker.date.past().toLocaleString().split(',')[0],
    };
    tasks.push(task);
  }
  return tasks;
};

const temp = generateTasks();

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
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || temp; //
  console.log('here 1');
  return <ToDoApp tasks={TASKS} />;
};

// dropdown
