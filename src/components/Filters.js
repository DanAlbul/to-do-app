import { useState, useRef } from 'react';

export const TaskFilters = () => {
  const showCategory = useRef(null);

  function toggleCatFilter() {
    showCategory.current.classList.toggle('show_cat_filter');
  }

  return (
    <div className="task-filters-block">
      <div className="cat-filter-wrapper">
        <button className="cat-filter-btn" onClick={toggleCatFilter}>
          Categories
        </button>
        <div
          ref={showCategory}
          id="categoryDropdown"
          className="cat_filter_list"
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
            />{' '}
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
