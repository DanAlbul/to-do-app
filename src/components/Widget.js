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

  const ordinals = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    11: 'th',
    12: 'th',
    13: 'th',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st',
  };

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
    day: date.getDate(),
    weekday: weekday[date.getDay()],
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };

  function formatDay(day) {
    const suffix = ordinals[day] || 'th';
    return day + suffix;
  }

  return (
    <div className="weekday_wrapper">
      <div className="today-widget">
        <h2>{`Today is ${D.weekday}, the ${formatDay(D.day)} day of ${
          D.month
        } ${D.year}`}</h2>
      </div>
    </div>
  );
};
