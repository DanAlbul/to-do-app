import { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TasksContext } from './Context';
import { Streetview } from '@mui/icons-material';

export const TaskFilters = () => {
  const showCategory = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    views,
    setViews,
    isUpdated,
    taskFilter,
    setIsUpdated,
    setTaskFilter,
  } = useContext(TasksContext);
  const [catFilters, seCatFilters] = useState([]);

  /*   const handleClickOutside = (event) => {
    if (event.target !== showCategory.current && isOpen)
      showCategory.current.classList.remove('show_cat_filter');
  };
 */

  /*   useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showCategory, isOpen]); 
*/

  const handleFilter = async (e) => {
    //const CATS = JSON.parse(window.localStorage.getItem('CATEGORIES_LIST'));

    if (!e.target.checked) {
      setTaskFilter(taskFilter.filter((item) => item !== e.target.value));
    } else {
      setTaskFilter((oldFilter) => [...oldFilter, e.target.value]);
    }

    setIsUpdated(Date.now());
  };

  useEffect(() => {
    const CATS = JSON.parse(window.localStorage.getItem('CATEGORIES_LIST'));
    const categories_list = CATS.map((cat) => {
      return (
        <label key={cat.cat_id} className="filter-item">
          <input
            className="filled-in"
            onChange={handleFilter}
            type="checkbox"
            name={cat.type.trim()}
            value={cat.type.trim()}
          />
          <span>{cat.type}</span>
        </label>
      );
    });

    seCatFilters(categories_list);
  }, [isUpdated]);

  function openCatFilter(e) {
    setIsOpen(!isOpen);
  }

  return (
    <div className="task-filters-block">
      <div className="cat-filter-wrapper">
        <button
          className="btn-floating waves-effect cat-filter-btn"
          onClick={(e) => openCatFilter(e)}
        >
          Categories
        </button>
        <div
          ref={showCategory}
          id="categoryDropdown"
          className={`cat_filter_list ${isOpen ? 'show_cat_filter' : ''}`}
        >
          {catFilters}
        </div>
      </div>
    </div>
  );
};
