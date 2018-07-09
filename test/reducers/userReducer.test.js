import test from 'ava';
import * as types from '../../src/constants';
import userReducer from '../../src/reducers/userReducer';

test('create user success', t => {
  const initialState = [
    { _id: 1, name: 'John' },
    { _id: 2, name: 'Mali' }
  ];

  const user = { _id: 3, name: 'Hideyoshi' };

  const action = {
    type: types.CREATE_USER_SUCCESS,
    user
  };

  const expectedState = [Object.assign({}, user), ...initialState];

  const newState = userReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});
