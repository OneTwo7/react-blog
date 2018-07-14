import strings from '../strings/utils/formatDate';

const periods = {
  second: 1000,
  minute: 60000,
  hour:   3600000,
  day:    86400000
};

export const fromNow = (date, lang) => {
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
        return strings[lang].fewSeconds;
      case seconds < 45:
        return strings[lang].getSeconds(seconds);
      default:
        return strings[lang].aMinute;
    }
  }

  if (time < 90 * minute) {
    const minutes = Math.ceil(time / minute);
    if (minutes < 45) {
      return strings[lang].getMinutes(minutes);
    } else {
      return strings[lang].anHour;
    }
  }

  if (time < 35 * hour) {
    const hours = Math.ceil(time / hour);
    return hours < 21 ? strings[lang].getHours(hours) : strings[lang].aDay;
  }

  if (time < 547 * day) {
    const days = Math.ceil(time / day);
    switch (true) {
      case days < 25:
        return strings[lang].getDays(days);
      case days < 45:
        return strings[lang].aMonth;
      case days < 319:
        return strings[lang].getMonths(Math.ceil(days / 30));
      default:
        return strings[lang].aYear;
    }
  }

  return strings[lang].getYears(Math.ceil(time / (day * 365)));
};
