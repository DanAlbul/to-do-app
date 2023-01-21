import { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TasksContext } from './Context';

export const TaskFilters = () => {
  const showCategory = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isUpdated } = useContext(TasksContext);
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

  useEffect(() => {
    const CATS = JSON.parse(window.localStorage.getItem('CATEGORIES_LIST'));
    const categories_list = CATS.map((cat) => {
      return (
        <label key={cat.cat_id} className="filter-item">
          <input
            className="filled-in"
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
