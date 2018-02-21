import * as types from '../constants';
import UserApi from '../../app/mockUserApi';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
};

export const loadUsers = () => {
  return (dispatch => {
    return UserApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  });
};
