import { useContext } from 'react';
import { TasksContext } from './Context';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import Tooltip from '@mui/material/Tooltip';

export const TasksManagement = () => {
  const { view, setView } = useContext(TasksContext);

  function addTask(e) {
    const message = e.target.value;
  }

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
      <input
        onChange={addTask}
        type="text"
        name="tasks-management"
        placeholder="Write a new task"
      />
      <Tooltip
        title={view === 'not-completed' ? 'Show completed' : 'Show ongoing'}
        placement="right"
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
