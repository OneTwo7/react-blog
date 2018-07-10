import * as types from '../constants';

const typeEndsInSuccess = (type) => {
  return type.split('_').pop() === 'SUCCESS';
};

const ajaxStatusReducer = (state = 0, action) => {
  const { type } = action;

  if (type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  }

  if (type === types.AJAX_CALL_ERROR || typeEndsInSuccess(type)) {
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;
