import test from 'ava';
import * as types from '../../src/constants';
import ajaxStatusReducer from '../../src/reducers/ajaxStatusReducer';

test('load post comments', t => {
  const initialState = 0;

  const action = {
    type: types.LOAD_POST_COMMENTS
  };

  const expectedState = 0;

  const newState = ajaxStatusReducer(initialState, action);

  t.is(newState, expectedState);
});

const initialState = 1;

test('begin ajax call', t => {
  const action = {
    type: types.BEGIN_AJAX_CALL
  };

  const expectedState = 2;

  const newState = ajaxStatusReducer(initialState, action);

  t.is(newState, expectedState);
});

test('ajax call error', t => {
  const action = {
    type: types.AJAX_CALL_ERROR
  };

  const expectedState = 0;

  const newState = ajaxStatusReducer(initialState, action);

  t.is(newState, expectedState);
});

test('action type ends in success', t => {
  const action = {
    type: types.LOGOUT_SUCCESS
  };

  const expectedState = 0;

  const newState = ajaxStatusReducer(initialState, action);

  t.is(newState, expectedState);
});

test('unrelated action type', t => {
  const action = {
    type: 'UNRELATED_ACTION_TYPE'
  };

  const newState = ajaxStatusReducer(initialState, action);

  t.is(newState, initialState);
});
