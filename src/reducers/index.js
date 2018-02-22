import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';
import users from './userReducer';
import comments from './commentReducer';

const rootReducer = combineReducers({
  posts,
  auth,
  users,
  comments
});

export default rootReducer;
