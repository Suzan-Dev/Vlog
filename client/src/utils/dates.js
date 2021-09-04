export const getBlogDate = (isoStringDate) => {
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

  const date = new Date(isoStringDate);

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDay();

  return `${month} ${day}, ${year}`;
};
