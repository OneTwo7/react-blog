import * as types from '../constants';
import AuthApi from '../../app/mockAuthApi';

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
    return AuthApi.login(email, password).then(user => {
      dispatch(loginSuccess(user));
    }).catch(error => {
      throw(error);
    });
  });
};

export const logout = () => {
  return (dispatch => {
    return AuthApi.logout().then(() => {
      dispatch(logoutSuccess());
    }).catch(error => {
      throw(error);
    });
  });
};

export const getCurrentUser = () => {
  return (dispatch => {
    return AuthApi.getCurrentUser().then(user => {
      dispatch(getCurrentUserSuccess(user));
    }).catch(error => {
      throw(error);
    });
  });
};
