import { GET_LANGUAGE, SET_LANGUAGE } from '../constants';

export const getLanguage = () => ({ type: GET_LANGUAGE });

export const setLanguage = (lang) => ({
  type: SET_LANGUAGE,
  lang
});
