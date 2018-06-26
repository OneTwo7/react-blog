import test from 'ava';
import * as userActions from '../../src/actions/userActions';
import * as types from '../../src/constants';

test('loadUsersSuccess', t => {
  const users = [
    { _id: 1, name: 'Andrew' },
    { _id: 2, name: 'Joanna'}
  ];

  const expectedAction = {
    type: types.LOAD_USERS_SUCCESS,
    users
  };

  const action = userActions.loadUsersSuccess(users);

  t.deepEqual(action, expectedAction);
});

test('createUserSuccess', t => {
  const user = {
    name: 'Andrew'
  };

  const expectedAction = {
    type: types.CREATE_USER_SUCCESS,
    user
  };

  const action = userActions.createUserSuccess(user);

  t.deepEqual(action, expectedAction);
});
