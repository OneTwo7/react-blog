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

export const loadUsers = () => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.get('/api/users').then(({ data }) => {
      dispatch(loadUsersSuccess(data));
    }).catch(error => dispatchAjaxCallError(error, dispatch));
  });
};

export const createUser = (user) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.post('/api/users', user).then(({ data }) => {
      dispatch(createUserSuccess(data));
      dispatch(getCurrentUserSuccess(data));
    }).catch(error => dispatchAjaxCallError(error, dispatch));
  });
};
