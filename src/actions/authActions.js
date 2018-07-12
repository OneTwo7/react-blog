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

export const createUserSuccess = (user) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
};

export const deleteUserSuccess = () => {
  return {
    type: types.DELETE_USER_SUCCESS,
  };
};

export const sendResetLinkSuccess = () => {
  return {
    type: types.SEND_RESET_LINK_SUCCESS
  };
};

export const resendActivationLinkSuccess = () => {
  return {
    type: types.RESEND_ACTIVATION_LINK_SUCCESS
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

export const createUser = (user) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.post('/api/users', user);
    dispatch(createUserSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const updateUser = (updateData, id) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.patch(`/api/users/${id}`, updateData);
    dispatch(updateUserSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const deleteUser = (id) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.delete(`/api/users/${id}`);
    dispatch(deleteUserSuccess());
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const sendResetLink = (email) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.post(`/api/users/password_reset`, { email });
    dispatch(sendResetLinkSuccess());
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const resendActivationLink = (email) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.post(`/api/users/resend_activation_link`, { email });
    dispatch(resendActivationLinkSuccess());
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

