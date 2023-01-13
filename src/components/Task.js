import { useState, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TasksContext } from './Context';

export const TaskItem = (props) => {
  const [completed, setCompleted] = useState(props.isCompleted);
  const [items, setItems] = useLocalStorage('TASKS_LIST', []);
  const { isUpdated, setIsUpdated } = useContext(TasksContext);

  function toggleStatus(e) {
    console.log(e.target);

    const tasks = JSON.parse(localStorage.getItem('TASKS_LIST'));
    const task = tasks.find((task) => task.id === props.id);
    task.completed = !completed;

    tasks[tasks.indexOf(task)] = task;

    setItems(tasks);

    console.log(task);

    setCompleted(!completed);
    setIsUpdated(Date.now());
  }

  return (
    <div className="task-block">
      <div className="task-main">
        <label>
          <input
            onChange={toggleStatus}
            className="task-checkbox filled-in"
            type="checkbox"
            name="task"
            checked={completed}
          />
          <span className={`${completed ? 'completed' : ''} task`}>
            {props.content}
          </span>
        </label>
      </div>
      <span className={'date-of-creation'}>{props.created}</span>
      <span className={`task-category ${props.category}`}></span>
    </div>
  );
};
