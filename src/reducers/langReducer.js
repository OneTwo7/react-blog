import { GET_LANGUAGE, SET_LANGUAGE } from '../constants';

const getLangCookie = () => {
  const cookie = document.cookie.match(new RegExp('lang=([^;]+)'));
  return cookie === null ? 'ru' : cookie[1];
};

const changeDocumentLang = (lang) => {
  document.title = lang === 'en' ? 'Blog' : 'Блог';
  document.documentElement.lang = lang;
};

export default (state = 'ru', action) => {
  const { type } = action;

  if (type === GET_LANGUAGE) {
    const lang = getLangCookie();
    changeDocumentLang(lang);
    return lang;
  }

  if (type === SET_LANGUAGE) {
    const { lang } = action;
    changeDocumentLang(lang);
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 3600 * 1000));
    document.cookie = `lang=${lang}; expires=${d.toUTCString()};`;
    return lang;
  }

  return state;
};
