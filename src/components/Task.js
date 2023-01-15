import { useState, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TasksContext } from './Context';

export const TaskItem = (props) => {
  const [completed, setCompleted] = useState(props.isCompleted);
  const [items, setItems] = useLocalStorage('TASKS_LIST', []);
  const { view, isUpdated, setIsUpdated } = useContext(TasksContext);

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
    <div
      className={`${completed ? 'completed' : ''} task-block`}
      onMouseOver={view === 'completed' ? hideLineThrough : null}
      onMouseOut={view === 'completed' ? showLineThrough : null}
      style={
        view === 'completed'
          ? {
              outlineColor: 'green',
              outlineStyle: 'solid',
              transition: 'text-decoration 100ms',
            }
          : {}
      }
    >
      <div className="task-main">
        <label>
          <input
            onChange={toggleStatus}
            className="task-checkbox filled-in"
            type="checkbox"
            name="task"
            checked={completed}
          />
          <span className="task">
            <span>{props.content}</span>
          </span>
        </label>
      </div>
      <span className={'date-of-creation'}>{props.created}</span>
      <span
        className={`task-category ${props.category}`}
        datacontent={props.category}
      ></span>
    </div>
  );
};

function showLineThrough(e) {
  e.target.style.textDecorationColor = 'black';
}

function hideLineThrough(e) {
  e.target.style.textDecorationColor = 'transparent';
}
