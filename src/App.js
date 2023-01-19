import { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { TasksList } from './components/TaskList';
import { TasksManagement } from './components/TasksManagement';
import { TasksContext } from './components/Context';
import { faker } from '@faker-js/faker';

const categories = [
  {
    type: 'Shopping',
    color: '#f7d000',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Health',
    color: '#c60821',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Personal',
    color: '#790e9f',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Work',
    color: '#048a1c',
    cat_id: faker.datatype.uuid(),
  },
];

const generateTasks = () => {
  const tasks = [];
  for (let i = 0; i < 10; i++) {
    const task = {
      content: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      category: categories[Math.floor(Math.random() * categories.length)],
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
  //window.localStorage.setItem('CATEGORIES_LIST', JSON.stringify(categories));
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || temp; //
  const CATS =
    JSON.parse(window.localStorage.getItem('CATEGORIES_LIST')) || categories;
  console.log('here 1');
  return <ToDoApp tasks={TASKS} categories={CATS} />;
};

// dropdown
