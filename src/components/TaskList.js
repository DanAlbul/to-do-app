import { TaskItem } from './Task';
import { useContext, useState, useMemo, useEffect } from 'react';
import { TasksContext } from './Context';

export const TasksList = ({ tasks }) => {
  //const [showTasks, setShowTasks] = useState(false);
  const { view } = useContext(TasksContext);

  useEffect(() => {
    window.localStorage.setItem('TASKS_LIST', JSON.stringify(tasks));
  }, [view]);

  const filteredTasks = useMemo(() => {
    let taskList = [];
    switch (view) {
      case 'completed':
        taskList = tasks.filter((item) => item.completed);
        break;

      case 'not-completed':
        taskList = tasks.filter((item) => !item.completed);
        break;
    }

    return taskList.map((task) => {
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
  }, [view, tasks]);

  return (
    <div className="tasks_wrapper">
      <ul>{filteredTasks}</ul>
    </div>
  );
};
