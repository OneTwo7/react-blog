import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';
import comments from './commentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import lang from './langReducer';

const rootReducer = combineReducers({
  posts,
  auth,
  comments,
  ajaxCallsInProgress,
  lang
});

export default rootReducer;
