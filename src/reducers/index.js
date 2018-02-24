import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';
import users from './userReducer';
import comments from './commentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  posts,
  auth,
  users,
  comments,
  ajaxCallsInProgress
});

export default rootReducer;
