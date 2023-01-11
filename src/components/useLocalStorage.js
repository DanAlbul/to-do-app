import React, { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    switch (key) {
      case 'TASKS_LIST': {
        return JSON.parse(localStorage.getItem('TASKS_LIST')) || initialValue;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('TASKS_LIST', JSON.stringify([...tasks, value]));
  }, [value, key]);

  return [value, setValue];
};
