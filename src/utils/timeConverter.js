const timeConverter = (UNIX_TIME) => {
  const date = new Date(1 * UNIX_TIME);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const time = `${month} ${day}, ${year}`;
  return time;
};

export default timeConverter;
