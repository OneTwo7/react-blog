import test from 'ava';
import * as authActions from '../../src/actions/authActions';
import * as types from '../../src/constants';

const user = {
  name: 'Andrew'
};

test('loginSuccess', t => {
  const expectedAction = {
    type: types.LOGIN_SUCCESS,
    user
  };

  const action = authActions.loginSuccess(user);

  t.deepEqual(action, expectedAction);
});

test('logoutSuccess', t => {
  const expectedAction = {
    type: types.LOGOUT_SUCCESS
  };

  const action = authActions.logoutSuccess();

  t.deepEqual(action, expectedAction);
});

test('getCurrentUserSuccess', t => {
  const expectedAction = {
    type: types.GET_CURRENT_USER_SUCCESS,
    user
  };

  const action = authActions.getCurrentUserSuccess(user);

  t.deepEqual(action, expectedAction);
});
