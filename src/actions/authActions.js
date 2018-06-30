import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import axios from 'axios';

export const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

export const getCurrentUserSuccess = (user) => {
  return {
    type: types.GET_CURRENT_USER_SUCCESS,
    user
  };
};

export const login = (email, password) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.post('/api/login', { email, password });
    dispatch(loginSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const logout = () => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.get('/api/logout');
    dispatch(logoutSuccess());
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const getCurrentUser = () => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.get('/api/current_user');
    dispatch(getCurrentUserSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});
