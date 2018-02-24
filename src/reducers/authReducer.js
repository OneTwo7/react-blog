import * as types from '../constants';

const authReducer = (state = null, action) => {
  let currentUser = null;

  switch (action.type) {
    case types.LOGIN_SUCCESS:
      currentUser = Object.assign({}, action.user);
      return currentUser;
    case types.LOGOUT_SUCCESS:
      return currentUser;
    case types.GET_CURRENT_USER_SUCCESS:
      if (action.user) {
        currentUser = Object.assign({}, action.user);
      } else {
        currentUser = {};
      }
      return currentUser;
    default:
      return state;
  }
};

export default authReducer;
