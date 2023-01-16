import { useContext, useState, useEffect } from 'react';
import { TasksContext } from './Context';
import { useLocalStorage } from './useLocalStorage';

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

export const TasksManagement = () => {
  const { view, setView, isUpdated, setIsUpdated } = useContext(TasksContext);
  const [value, setValue] = useState('');
  const [items, setItems] = useLocalStorage('TASKS_LIST', []);

  const submitHandler = (e) => {
    e.preventDefault();

    const tasks = JSON.parse(localStorage.getItem('TASKS_LIST'));
    const new_task = createNewTask(value) || null;
    if (!new_task) return;

    setIsUpdated(Date.now());
    setItems([...tasks, new_task]); // update localStorage with new task

    console.log(isUpdated);
    setValue(''); // clear add task input field
  };

  const createNewTask = (text, cat = { color: '#333', name: 'Other' }) => {
    if (!text) return;
    const uid = Math.floor(Math.random() * Date.now()).toString(16);
    const new_task = {
      content: text,
      completed: false,
      category: { color: cat.color, name: cat.name },
      id: uid,
      date_created: new Date(Date.now()).toLocaleString().split(',')[0], //get date in format "dd/mm/yy", [1] - for time
    };

    // console.log('new_task', new_task);

    return new_task;
  };

  function swithView() {
    console.log(view);

    switch (view) {
      case 'completed':
        setView('not-completed');
        break;
      case 'not-completed':
        setView('completed');
        break;
    }
  }

  return (
    <div className="tasks-management">
      <div style={{ position: 'relative' }}>
        <form>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            /* onChange={(e) => setItems(createNewTask(e.target.value))} */
            type="text"
            name="add-task"
            placeholder="Write a new task"
          />
          <button
            type="button"
            onClick={submitHandler}
            htmlFor="add-task"
            className="btn add_task_btn"
            title="Add task"
            style={{
              position: 'absolute',
              right: '0px',
            }}
          >
            <AddIcon />
          </button>
        </form>
      </div>
      <Tooltip
        title={view === 'not-completed' ? 'Show completed' : 'Show ongoing'}
        placement="bottom"
      >
        <a
          className="btn-floating waves-effect waves-red show_completed_btn"
          onClick={swithView}
        >
          <PlaylistAddCheckOutlinedIcon
            style={{
              margin: '0 auto 3px auto',
              verticalAlign: 'middle',
            }}
          />
        </a>
      </Tooltip>
    </div>
  );
};
