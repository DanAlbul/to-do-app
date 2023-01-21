import { useState, useRef, useEffect } from 'react';

export const TaskFilters = () => {
  const showCategory = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target !== showCategory.current && isOpen)
      showCategory.current.classList.remove('show_cat_filter');
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showCategory, isOpen]);

  function openCatFilter(e) {
    setIsOpen(!isOpen);
    console.log(isOpen);
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
          <label className="filter-item">
            <input
              className="filled-in"
              type="checkbox"
              name="Health"
              value="Health"
            />
            <span>Health</span>
          </label>
          <label className="filter-item">
            <input
              className="filled-in"
              type="checkbox"
              name="Work"
              value="Work"
            />
            <span>Work</span>
          </label>
          <label className="filter-item">
            <input
              className="filled-in"
              type="checkbox"
              name="Personal"
              value="Personal"
            />
            <span>Personal</span>
          </label>
          <label className="filter-item">
            <input
              className="filled-in"
              type="checkbox"
              name="Shopping"
              value="Shopping"
            />
            <span>Shopping</span>
          </label>
          <label className="filter-item">
            <input
              className="filled-in"
              type="checkbox"
              name="Other"
              value="Other"
            />
            <span>Other</span>
          </label>
        </div>
      </div>
    </div>
  );
};
