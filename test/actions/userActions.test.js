import test from 'ava';
import * as userActions from '../../src/actions/userActions';
import * as types from '../../src/constants';

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
