import { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import TASKS from './data/tasks.json';
import { createContext } from 'react';

const TasksContext = createContext({
  view: 'not-completed',
  setView: () => {},
});

export const Widget = () => {
  const date = new Date();

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const D = {
    day: date.getDay(),
    weekday: weekday[date.getDay()],
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };

  return (
    <div className="weekday_wrapper">
      <div className="today-widget">
        <h2>{`Today is ${D.weekday}, the ${D.day} day of ${D.month} ${D.year}`}</h2>
      </div>
    </div>
  );
};

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
          />
          <span className={`${completed || done ? 'completed' : ''} task`}>
            {content}
          </span>
        </label>
      </div>
      <span className={`task-category ${category}`}></span>
    </div>
  );
};

export const TasksList = ({ tasks }) => {
  const { view, setView } = useContext(TasksContext);
  //const [completed, setCompleted] = useState(false);

  useEffect(() => {});

  const filteredTasks = useMemo(() => {
    let taskList = [];

    switch (view) {
      case 'completed':
        {
          taskList = tasks.filter((item) => item.completed);
          //setCompleted(true);
        }
        break;

      case 'not-completed':
        {
          taskList = tasks.filter((item) => !item.completed);
          // setCompleted(false);
        }
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
  }, [view]);

  console.log(filteredTasks);
  return (
    <div className="tasks_wrapper">
      <ul>{filteredTasks}</ul>
    </div>
  );
};

export const TasksManagement = () => {
  const { view, setView } = useContext(TasksContext);

  function swithView() {
    console.log(view);

    switch (view) {
      case 'completed':
        {
          setView('not-completed');
        }
        break;
      case 'not-completed':
        {
          setView('completed');
        }
        break;
    }
  }

  return (
    <div className="tasks-management">
      <input
        type="text"
        name="tasks-management"
        placeholder="Write a new task"
      />
      <button className="show_completed_btn" onClick={swithView}>
        L
      </button>
    </div>
  );
};

export const ToDoApp = ({ tasks }) => {
  const [view, setView] = useState('not-completed');
  const value = { view, setView };

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
  return <ToDoApp tasks={TASKS} />;
};
