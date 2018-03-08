const periods = {
  'second': 1000,
  'minute': 60000,
  'hour':   3600000,
  'day':    86400000
};

export const fromNow = (date) => {
  if (!(date instanceof Date)) {
    return '';
  }

  const time = new Date() - date;

  if (time < 90 * periods.second) {
    const seconds = Math.ceil(time / periods.second);
    switch (true) {
      case seconds < 15:
        return 'a few seconds ago';
      case seconds < 45:
        return seconds + ' seconds ago';
      default:
        return 'a minute ago';
    }
  }

  if (time < 90 * periods.minute) {
    const minutes = Math.ceil(time / periods.minute);
    return minutes < 45 ? minutes + ' minutes ago' : 'an hour ago';
  }

  if (time < 35 * periods.hour) {
    const hours = Math.ceil(time / periods.hour);
    return hours < 21 ? hours + ' hours ago' : 'a day ago';
  }

  if (time < 547 * periods.day) {
    const days = Math.ceil(time / periods.day);
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

  return Math.ceil(time / (periods.day * 365)) + ' years ago';
};
