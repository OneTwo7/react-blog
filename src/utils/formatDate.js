const periods = {
  'second': 1000,
  'minute': 60000,
  'hour':   3600000,
  'day':    86400000
};

export const fromNow = (date) => {
  const num = new Date() - date;

  if (num < 90 * periods.second) {
    const seconds = Math.ceil(num / periods.second);
    switch (true) {
      case seconds < 15:
        return 'a few seconds ago';
      case seconds < 45:
        return seconds + ' seconds ago';
      default:
        return 'a minute ago';
    }
  }

  if (num < 90 * periods.minute) {
    const minutes = Math.ceil(num / periods.minute);
    return minutes < 45 ? minutes + ' minutes ago' : 'an hour ago';
  }

  if (num < 35 * periods.hour) {
    const hours = Math.ceil(num / periods.hour);
    return hours < 21 ? hours + ' hours ago' : 'a day ago';
  }

  if (num < 547 * periods.day) {
    const days = Math.ceil(num / periods.day);
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

  return Math.ceil(num / (periods.day * 365)) + ' years ago';
};
