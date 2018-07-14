export default {
  ru: {
    fewSeconds: 'несколько секунд назад',
    aMinute: 'минуту назад',
    anHour: 'час назад',
    aDay: 'день назад',
    aMonth: 'месяц назад',
    aYear: 'год назад',
    getSeconds (seconds) {
      const lastNum = seconds % 10;
      if (lastNum === 1) {
        return seconds + ' секунду назад';
      } else if (lastNum < 5) {
        return seconds + ' секунды назад';
      } else {
        return seconds + ' секунд назад';
      }
    },
    getMinutes (minutes) {
      const lastNum = minutes % 10;
      if (lastNum === 1 && minutes !== 11) {
        return minutes + ' минуту назад';
      } else if (minutes < 5 || (minutes > 21 && lastNum > 1 && lastNum < 5)) {
        return minutes + ' минуты назад';
      } else {
        return minutes + ' минут назад';
      }
    },
    getHours (hours) {
      if (hours < 5) {
        return hours + ' часа назад';
      } else {
        return hours + ' часов назад';
      }
    },
    getDays (days) {
      if (days === 21) {
        return days + ' день назад';
      } else if (days > 4 && days < 21) {
        return days + ' дней назад';
      } else {
        return days + ' дня назад';
      }
    },
    getMonths (months) {
      if (months < 5) {
        return months + ' месяца назад';
      } else {
        return months + ' месяцев назад';
      }
    },
    getYears (years) {
      const lastNum = years % 10;
      if (lastNum === 1 && years !== 11) {
        return years + ' год назад';
      } else if (years < 5 || (years > 20 && lastNum > 1 && lastNum < 5)) {
        return years + ' года назад';
      } else {
        return years + ' лет назад';
      }
    }
  },
  en: {
    fewSeconds: 'a few seconds ago',
    aMinute: 'a minute ago',
    anHour: 'an hour ago',
    aDay: 'a day ago',
    aMonth: 'a month ago',
    aYear: 'a year ago',
    getSeconds (seconds) {
      return seconds + ' seconds ago';
    },
    getMinutes (minutes) {
      return minutes + ' minutes ago';
    },
    getHours (hours) {
      return hours + ' hours ago';
    },
    getDays (days) {
      return days + ' days ago';
    },
    getMonths (months) {
      return months + ' months ago';
    },
    getYears (years) {
      return years + ' years ago';
    }
  }
};
