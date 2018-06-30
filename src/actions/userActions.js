import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import { getCurrentUserSuccess } from './authActions';
import axios from 'axios';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
};

export const createUserSuccess = (user) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
};

export const loadUsers = () => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.get('/api/users');
    dispatch(loadUsersSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const createUser = (user) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.post('/api/users', user);
    dispatch(createUserSuccess(data));
    dispatch(getCurrentUserSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});
