export const formatDate = date => {
  const parse = new Date(date);

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Des',
  ];

  const day = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return `${day[parse.getDay() - 1]}, ${parse.getDate()} ${
    month[parse.getMonth()]
  } ${parse.getFullYear()}`;
};

export const getOnlyMonth = date => {
  const parse = new Date(date);

  const month = [
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

  return `${month[parse.getMonth()]}`;
};

export const getOnlyDateMonth = date => {
  const parse = new Date(date);

  const month = [
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

  return `${parse.getDate()} ${month[parse.getMonth()]}`;
};

export const getMonthDateYear = date => {
  const parse = new Date(date);

  const month = [
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

  return `${
    month[parse.getMonth()]
  } ${parse.getDate()}, ${parse.getFullYear()}`;
};
