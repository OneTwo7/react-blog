import * as types from '../constants';

const userReducer = (state = [], action) => {
  if (action.type === types.LOAD_USERS_SUCCESS) {
    return [...action.users];
  }
  if (action.type === types.CREATE_USER_SUCCESS) {
    return [Object.assign({}, action.user), ...state];
  }
  return state;
};

export default userReducer;
