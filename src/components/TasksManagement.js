import { useContext } from 'react';
import { TasksContext } from './Context';

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
			
      <button className="show_completed_btn" onClick={swithView}>
        L
      </button>
    </div>
  );
};
