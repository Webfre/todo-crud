function dateTask() {
  const dateTask = new Date();
  const timeMinute =
    ('0' + dateTask.getHours()).slice(-2) +
    ':' +
    ('0' + dateTask.getMinutes()).slice(-2) +
    ':' +
    ('0' + dateTask.getSeconds()).slice(-2);
  const timeDay =
    ('0' + dateTask.getDate()).slice(-2) +
    '.' +
    ('0' + (dateTask.getMonth() + 1)).slice(-2) +
    '.' +
    dateTask.getFullYear();

  // return {
  //   timeDay,
  //   timeMinute,
  // };

  return timeMinute;
}

export default dateTask;
