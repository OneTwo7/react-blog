import test from 'ava';
import * as types from '../../src/constants';
import authReducer from '../../src/reducers/authReducer';

const initialState = null;

const user = {
  _id: 1,
  name: 'Lucy'
};

const expectedState = Object.assign({}, user);

test('login success', t => {
  const action = {
    type: types.LOGIN_SUCCESS,
    user
  };

  const newState = authReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('logout success', t => {
  const initialState = user;

  const action = {
    type: types.LOGOUT_SUCCESS
  };

  const expectedState = {};

  const newState = authReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('get current user success with user', t => {
  const action = {
    type: types.GET_CURRENT_USER_SUCCESS,
    user
  };

  const newState = authReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('get current user success without user', t => {
  const action = {
    type: types.GET_CURRENT_USER_SUCCESS,
    user: undefined
  };

  const expectedState = {};

  const newState = authReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});
