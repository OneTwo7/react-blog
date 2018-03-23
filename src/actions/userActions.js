import * as types from '../constants';
import UserApi from '../../app/mocks/mockUserApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
};

export const loadUsers = () => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return UserApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};
