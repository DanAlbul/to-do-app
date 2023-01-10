import { useState } from 'react';
import TASKS from './data/tasks.json';
/* import { createContext } from 'react';
 */

/* const TasksContext = createContext({
  done: true,
}); */

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

export const TaskItem = ({ content, category }) => {
  const [completed, setCompleted] = useState(false);

  /*   useEffect(() => {


  }, completed) */

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
          <span className={`${completed ? 'completed' : ''} task`}>
            {content}
          </span>
        </label>
      </div>
      <span className={`task-category ${category}`}></span>
    </div>
  );
};

export const TasksList = ({ tasks }) => {
  //const [listType, setListType] = useState();

  //const taskType = useContext(TasksContext);

  const tasksList = [];

  tasks.forEach((task) => {
    tasksList.push(
      <li key={task.category}>
        <TaskItem content={task.content} category={task.category} />
      </li>
    );
  });

  return (
    <div className="tasks_wrapper">
      {/* <TasksContext.Provider value={listType}> */}
      <ul>{tasksList}</ul>
      {/*  </TasksContext.Provider> */}
    </div>
  );
};

export const TasksManagement = () => {
  return (
    <div className="tasks-management">
      <input
        type="text"
        name="tasks-management"
        placeholder="Write a new task"
      />
      <button className="show_completed_btn">L</button>
    </div>
  );
};

export const ToDoApp = ({ tasks }) => {
 
  return (
    <>
      <Widget data={`Today is Thursday : the 6th of November 2023`} />
      <TasksList tasks={tasks} />
      <TasksManagement />
    </>
  );
};

export const App = () => {
  return <ToDoApp tasks={TASKS} />;
};
