import * as types from '../constants';

const typeEndsInSuccess = (type) => {
  return type.slice(-8) === '_SUCCESS';
};

const ajaxStatusReducer = (state = 0, action) => {
  const { type } = action;

  if (type === types.LOAD_POST_COMMENTS_SUCCESS) {
    return state;
  }

  if (type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  }

  if (type === types.AJAX_CALL_ERROR || typeEndsInSuccess(type)) {
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;
