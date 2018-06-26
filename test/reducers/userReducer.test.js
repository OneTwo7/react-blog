import test from 'ava';
import * as types from '../../src/constants';
import userReducer from '../../src/reducers/userReducer';

const users = [
  { _id: 1, name: 'John' },
  { _id: 2, name: 'Mali' }
];

test('load users success', t => {
  const initialState = [];

  const action = {
    type: types.LOAD_USERS_SUCCESS,
    users
  }

  const expectedState = [...users];

  const newState = userReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});


test('create user success', t => {
  const initialState = users;

  const user = { _id: 3, name: 'Hideyoshi' };

  const action = {
    type: types.CREATE_USER_SUCCESS,
    user
  };

  const expectedState = [Object.assign({}, user), ...users];

  const newState = userReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});
