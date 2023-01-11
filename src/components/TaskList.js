import { TaskItem } from './Task';
import { useContext, useState, useMemo, useEffect } from 'react';
import { TasksContext } from './Context';

export const TasksList = ({ tasks }) => {
  const { view, isUpdated, setIsUpdated } = useContext(TasksContext);
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST'));

  const filteredTasks = useMemo(() => {
    if (isUpdated) setIsUpdated(!isUpdated);
    let taskList = [];
    switch (view) {
      case 'completed':
        taskList = TASKS.filter((item) => item.completed);
        break;

      case 'not-completed':
        taskList = TASKS.filter((item) => !item.completed);
        break;
    }

    return taskList.map((task) => {
      console.log('here 2');
      return (
        <li key={task.id}>
          <TaskItem
            content={task.content}
            category={task.category}
            done={task.completed}
          />
        </li>
      );
    });
  }, [view, isUpdated, TASKS]);

  return (
    <div
      className={`${
        filteredTasks.length > 10 ? 'multiple-list' : ''
      } tasks_wrapper`}
    >
      <ul>{filteredTasks}</ul>
    </div>
  );
};
