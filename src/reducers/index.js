import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  posts,
  auth,
  users
});

export default rootReducer;
