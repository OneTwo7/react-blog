const strings = require('../strings/mocks');

const errorMessages = {
  ru: {
    posts: strings.ru.helpers.postLimit,
    comments: strings.ru.helpers.commentsLimit
  },
  en: {
    posts: strings.en.helpers.postLimit,
    comments: strings.en.helpers.commentsLimit
  }
};

exports.options = {
  maxAge: 3600000
};

exports.generateId = () => (
  'id' + Math.random().toString(36).split('.')[1]
);

exports.exceedsSizeLimit = (object, type, res, lang = 'ru') => {
  if (object.toString().length > 2048) {
    res.status(400);
    res.send({ reason: errorMessages[lang][type] });
    return true;
  } else {
    return false;
  }
};
