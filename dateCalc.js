const dayMonth = (d) => {
  const dayMonth = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
  return dayMonth;
};

const month = (d) => {
  const month =
    d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
  return month;
};

const year = (d) => {
  return d.getFullYear();
};

const hour = (d) => {
  return d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`;
};

const minute = (d) => {
  return d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`;
};

const seconds = (d) => {
  return d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`;
};

const timestampWithoutTimezone = (d) => {
  t = new Date(d);
  return `${year(t)}-${month(t)}-${dayMonth(t)} ${hour(t)}:${minute(
    t
  )}:${seconds(t)}`;
};

const currentDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month =
    d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
  const dayMonth = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
  return `${year}-${month}-${dayMonth}`;
};

const currentDateTime = () => {
  const d = new Date();
  return `${year(d)}-${month(d)}-${dayMonth(d)}T${hour(d)}:${minute(d)}`;
};

module.exports = {
  timestampWithoutTimezone,
  currentDate,
  currentDateTime,
};
