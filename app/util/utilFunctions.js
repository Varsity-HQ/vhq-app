export const date_after_24hr = (starting_date) => {
  return new Date(
    new Date(starting_date).getTime() + 60 * 60 * 24 * 1000,
  ).toISOString();
};

export const add_days = function (starting_date, days) {
  var myDate = new Date(starting_date);
  myDate.setDate(myDate.getDate() + parseInt(days));
  return myDate;
};

export const subtract_days = function (starting_date, days) {
  var myDate = new Date(starting_date);
  myDate.setDate(myDate.getDate() - parseInt(days));
  return myDate;
};

export function msToTime(duration, timeOutMsg) {
  var hours = duration / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var hr = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var min = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var sec = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  // return { hr, min, sec };

  if (parseInt(hr) > 0 || parseInt(min) > 0 || parseInt(sec) > 0) {
    return (
      parseInt(hr) +
      " hrs, " +
      parseInt(min) +
      " mins, " +
      sec +
      " seconds " +
      " left"
    );
  } else {
    return timeOutMsg;
  }
}
