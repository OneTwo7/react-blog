import test from 'ava';
import * as langActions from '../../src/actions/langActions';
import * as types from '../../src/constants';

test('getLanguage', t => {
  const expectedAction = {
    type: types.GET_LANGUAGE
  };

  const action = langActions.getLanguage();

  t.deepEqual(action, expectedAction);
});

test('setLanguage', t => {
  const expectedAction = {
    type: types.SET_LANGUAGE,
    lang: 'en'
  };

  const action = langActions.setLanguage('en');

  t.deepEqual(action, expectedAction);
});
