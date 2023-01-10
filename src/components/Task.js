import { useState } from 'react';

export const TaskItem = ({ content, category, done }) => {
  const [completed, setCompleted] = useState(false);

  function toggleStatus() {
    setCompleted(!completed);
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
            {content}
          </span>
        </label>
      </div>
      <span className={`task-category ${category}`}></span>
    </div>
  );
};
