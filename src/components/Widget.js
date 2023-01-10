export const Widget = () => {
  const date = new Date();

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const D = {
    day: date.getDay(),
    weekday: weekday[date.getDay()],
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };

  return (
    <div className="weekday_wrapper">
      <div className="today-widget">
        <h2>{`Today is ${D.weekday}, the ${D.day} day of ${D.month} ${D.year}`}</h2>
      </div>
    </div>
  );
};
