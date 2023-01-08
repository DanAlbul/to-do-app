export const App = () => {
  return (
    <>
      <div className="weekday_wrapper">
        <div className="today-widget">
          <h2>
            Today is Thursday <br /> the 6th of November 2023
          </h2>
        </div>
      </div>
      <div className="tasks_wrapper">
        <ul>
          <li>
            <div className="task-block">
              <div className="task-main">
                <label>
                  <input
                    className="task-checkbox filled-in"
                    type="checkbox"
                    name="task"
                  />
                  <span className="task">
                    Finish 2nd part of 'Anubis' project during
                  </span>
                </label>
              </div>
              <span className="task-category work-cat"></span>
            </div>
          </li>
          <li>
            <div className="task-block">
              <div className="task-main">
                <label>
                  <input
                    className="task-checkbox filled-in"
                    type="checkbox"
                    name="task"
                  />
                  <span className="task">Take pills and vitamines</span>
                </label>
              </div>
              <span className="task-category health-cat"></span>
            </div>
          </li>
          <li>
            <div className="task-block">
              <div className="task-main">
                <label>
                  <input
                    className="task-checkbox filled-in"
                    type="checkbox"
                    name="task"
                  />
                  <span className="task">Pick up delivery</span>
                </label>
              </div>
              <span className="task-category personal-cat"></span>
            </div>
          </li>
          <li>
            <div className="task-block">
              <div className="task-main">
                <label>
                  <input
                    className="task-checkbox filled-in"
                    type="checkbox"
                    name="task"
                  />
                  <span className="task">Buy some foods </span>
                </label>
              </div>
              <span className="task-category shopping-cat"></span>
            </div>
          </li>
        </ul>
      </div>
      <div className="add_task">
        <input type="text" name="add_task" placeholder="Write a new task" />
        <button className="show_completed_btn">L</button>
      </div>
    </>
  );
};
