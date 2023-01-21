import { TaskItem } from './Task';
import { useContext, useState, useMemo, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { TaskFilters } from './Filters';
import { TasksContext } from './Context';

export const TasksList = ({ tasks }) => {
  const TASKS = JSON.parse(window.localStorage.getItem('TASKS_LIST'));
  const listRef = useRef(null);

  const {
    views,
    setViews,
    isUpdated,
    setIsUpdated,
    taskFilter,
    setTaskFilter,
  } = useContext(TasksContext);

  const filteredTasks = useMemo(() => {
    if (isUpdated) {
      setTimeout(() => {
        setIsUpdated(!isUpdated);
      }, 250);
    }

    let taskList = [];
    const uncompleted = views.includes('completed');

    if (taskFilter.length === 0)
      taskList = TASKS.filter((item) => item.completed === uncompleted);
    else {
      taskList = TASKS.filter(
        (item) =>
          taskFilter.includes(item.category.type) &&
          item.completed === uncompleted
      );
    }

    console.log(taskList);

    return taskList.map((task) => {
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
  }, [views, isUpdated, TASKS]);

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
