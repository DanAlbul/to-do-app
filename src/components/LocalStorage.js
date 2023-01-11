export const removeItem = () => {};

export const addItem = ({ text, category }) => {
  const uid = Math.floor(Math.random() * Date.now()).toString(16);
  const new_task = {
    content: text,
    completed: false,
    category: category || 'other',
    id: uid,
  };

  const tasks = JSON.parse(localStorage.getItem('TASKS_LIST'));

  localStorage.setItem('TASKS_LIST', JSON.stringify([...tasks, new_task]));
};

export const getItem = () => {};
