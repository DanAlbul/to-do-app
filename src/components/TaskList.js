import { TaskItem } from './Task';
import { useContext, useState, useMemo, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';

import { TasksContext } from './Context';
import { MyLocation } from '@mui/icons-material';

export const TasksList = ({ tasks }) => {
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST'));
  const listRef = useRef(null);

  const { view, isUpdated, setIsUpdated } = useContext(TasksContext);

  const filteredTasks = useMemo(() => {
    if (isUpdated) {
      setTimeout(() => {
        setIsUpdated(!isUpdated);
      }, 250);
    }
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
            id={task.id}
            content={task.content}
            category={task.category}
            isCompleted={task.completed}
            created={task.date_created}
          />
        </li>
      );
    });
  }, [view, isUpdated, TASKS]);

  /* listRef.current?.lastChild?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'end',
  }); */

  return (
    <div
      className={`${
        filteredTasks.length > 10 ? 'multiple-list' : ''
      } tasks_wrapper`}
    >
      <ul ref={listRef}>{filteredTasks}</ul>
    </div>
  );
};
