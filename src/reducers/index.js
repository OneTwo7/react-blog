import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';
import comments from './commentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  posts,
  auth,
  comments,
  ajaxCallsInProgress
});

export default rootReducer;
