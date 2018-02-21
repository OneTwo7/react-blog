import * as types from '../constants';

const userReducer = (state = [], action) => {
  if (action.type === types.LOAD_USERS_SUCCESS) {
    return [...action.users];
  }
  return state;
};

export default userReducer;
