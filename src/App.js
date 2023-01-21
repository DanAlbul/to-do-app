import { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { TasksList } from './components/TaskList';
import { TasksManagement } from './components/TasksManagement';
import { TasksContext } from './components/Context';
import { faker } from '@faker-js/faker';
import { TaskFilters } from './components/Filters';
import tasks from './data/tasks.json';

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
  {
    type: 'Other',
    color: '#3b3b3b',
    cat_id: 'default_cat_id',
  },
];

const generateTasks = () => {
  const tasks = [];
  for (let i = 0; i < 30; i++) {
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
        <TaskFilters />
        <TasksList tasks={tasks} />
        <TasksManagement />
      </TasksContext.Provider>
    </>
  );
};

export const App = () => {
  window.localStorage.setItem('TASKS_LIST', JSON.stringify(temp));
  window.localStorage.setItem('CATEGORIES_LIST', JSON.stringify(categories));
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST')) || temp; //
  const CATS =
    JSON.parse(window.localStorage.getItem('CATEGORIES_LIST')) || categories; //
  return <ToDoApp tasks={TASKS} categories={CATS} />;
};

// dropdown
