const periods = {
  second: 1000,
  minute: 60000,
  hour:   3600000,
  day:    86400000
};

export const fromNow = (date) => {
  const parsedDate = Date.parse(date);

  if (isNaN(parsedDate)) {
    return '';
  }

  const time = new Date() - parsedDate;
  const { second, minute, hour, day } = periods;

  if (time < 90 * second) {
    const seconds = Math.ceil(time / second);
    switch (true) {
      case seconds < 15:
        return 'a few seconds ago';
      case seconds < 45:
        return seconds + ' seconds ago';
      default:
        return 'a minute ago';
    }
  }

  if (time < 90 * minute) {
    const minutes = Math.ceil(time / minute);
    return minutes < 45 ? minutes + ' minutes ago' : 'an hour ago';
  }

  if (time < 35 * hour) {
    const hours = Math.ceil(time / hour);
    return hours < 21 ? hours + ' hours ago' : 'a day ago';
  }

  if (time < 547 * day) {
    const days = Math.ceil(time / day);
    switch (true) {
      case days < 25:
        return days + ' days ago';
      case days < 45:
        return 'a month ago';
      case days < 319:
        return Math.ceil(days / 30) + ' months ago';
      default:
        return 'a year ago';
    }
  }

  return Math.ceil(time / (day * 365)) + ' years ago';
};
