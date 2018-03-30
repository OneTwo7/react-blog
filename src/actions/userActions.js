import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import axios from 'axios';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
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
