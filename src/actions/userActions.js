import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import { getCurrentUserSuccess } from './authActions';
import axios from 'axios';

export const createUserSuccess = (user) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
};

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
