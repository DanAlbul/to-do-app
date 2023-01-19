import { useContext, useState, useEffect, useMemo } from 'react';
import { TasksContext } from './Context';
import { useLocalStorage } from './useLocalStorage';
import { faker } from '@faker-js/faker';

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

export const TasksManagement = () => {
  const { view, setView, isUpdated, setIsUpdated } = useContext(TasksContext);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState({
    type: 'Other',
    color: '#333',
    cat_id: 'default_id',
  });
  const [items, setItems] = useLocalStorage('TASKS_LIST', []);
  const [cats, setCats] = useLocalStorage('CATEGORIES_LIST', []);

  const options = useMemo(() => {
    return cats.map((cat) => {
      return <option key={cat.cat_id}>{cat.type}</option>;
    });
  }, [cats]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const isTaskCreated = await updateTasksList();
    if (!isTaskCreated) return;

    setIsUpdated(Date.now());
    setValue(''); // clear add task input field
  };

  const updateTasksList = async () => {
    if (!value) return false;

    await updateCategoriesList();

    const tasks = [...items];
    const new_task = createNewTask(value) || null;

    setItems([...tasks, new_task]);
    return true;
  };

  const updateCategoriesList = async () => {
    const categories = [...cats];
    console.log(category.type);
    //if category already exists - do not create new category
    const cat = categories.find((cat) => cat.type === category.type);
    console.log(cat);
    if (cat) {
      setCategory({
        ...category,
        cat_id: cat.cat_id,
      });
      return;
    }

    const new_category = {
      type: category.type,
      color: category.color,
      cat_id: faker.datatype.uuid(),
    };

    setCategory({
      ...new_category,
    });

    setCats([...categories, new_category]);
  };

  function handleCatColor(e) {
    setCategory({
      ...category,
      color: e.target.value,
    });
    document.documentElement.style.setProperty('--cat-color', e.target.value);
  }

  const createNewTask = (text) => {
    const uid = Math.floor(Math.random() * Date.now()).toString(16);
    const new_task = {
      content: text,
      completed: false,
      category: {
        ...category,
      },
      id: uid,
      date_created: new Date(Date.now()).toLocaleString().split(',')[0], //get date in format "dd/mm/yy", [1] - for time
    };

    return new_task;
  };

  function swithView() {
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
      <div
        className="tasks-management_user-input"
        style={{ position: 'relative' }}
      >
        <form>
          <input
            id="add-task"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            name="add-task"
            placeholder="Write a new task"
          />

          <div className="category-choice-wrapper">
            <input
              list="task-categories"
              id="category-choice"
              name="category-choice"
              placeholder="Other"
              onChange={(e) =>
                setCategory({
                  ...category,
                  type: e.target.value,
                })
              }
              value={category.type}
            />
            <datalist id="task-categories">{options}</datalist>
            <input
              onChange={(e) => handleCatColor(e)}
              type="color"
              id="colors"
              value={category.color}
            />
          </div>

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
