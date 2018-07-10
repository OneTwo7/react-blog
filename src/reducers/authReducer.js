import * as types from '../constants';

const authReducer = (state = null, { type, user }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, user);
    case types.LOGOUT_SUCCESS:
      return {};
    case types.GET_CURRENT_USER_SUCCESS:
      if (user) {
        return Object.assign({}, user);
      } else {
        return {};
      }
    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, user);
    case types.UPDATE_USER_SUCCESS:
      return Object.assign({}, user);
    case types.DELETE_USER_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default authReducer;
