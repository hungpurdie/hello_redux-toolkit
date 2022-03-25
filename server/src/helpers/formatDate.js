const dateToSlash = (date) => {
  return date.toLocaleDateString("vi-VN");
};

const dateToDashesWithTime = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return ` ${hour}:${minute} ${day}-${month}-${year}`;
};

const dateToDashes = (date) => {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return `${d <= 9 ? "0" + d : d}-${m <= 9 ? "0" + m : m}-${y}`;
};

module.exports = {
  dateToSlash,
  dateToDashesWithTime,
  dateToDashes,
};
