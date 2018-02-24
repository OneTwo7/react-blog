import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../constants';

const typeEndsInSuccess = (type) => {
  return type.slice(-8) === '_SUCCESS';
};

const ajaxStatusReducer = (state = 0, action) => {
  const { type } = action;

  if (type === BEGIN_AJAX_CALL) {
    return state + 1;
  }

  if (type === AJAX_CALL_ERROR || typeEndsInSuccess(type)) {
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;
