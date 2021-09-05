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

  const convertedDate = new Date(isoStringDate);

  const year = convertedDate.getFullYear();
  const month = months[convertedDate.getMonth()];
  const date = convertedDate.getDate();

  return `${month} ${date}, ${year}`;
};
