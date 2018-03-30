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

export const login = (email, password) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.post('/api/login', { email, password }).then(({ data }) => {
      dispatch(loginSuccess(data));
    }).catch(error => dispatchAjaxCallError(error, dispatch));
  });
};

export const logout = () => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.get('/api/logout').then(() => {
      dispatch(logoutSuccess());
    }).catch(error => dispatchAjaxCallError(error, dispatch));
  });
};

export const getCurrentUser = () => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.get('/api/current_user').then(({ data }) => {
      dispatch(getCurrentUserSuccess(data));
    }).catch(error => dispatchAjaxCallError(error, dispatch));
  });
};
