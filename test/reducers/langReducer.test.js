import test from 'ava';
import * as types from '../../src/constants';
import langReducer from '../../src/reducers/langReducer';

const initialState = 'ru';

test('get language', t => {
  const action = {
    type: types.GET_LANGUAGE
  };

  const expectedState = 'ru';

  const newState = langReducer(initialState, action);

  t.is(newState, expectedState);
});

test('set language', t => {
  const action = {
    type: types.SET_LANGUAGE,
    lang: 'en'
  };

  const expectedState = 'en';

  const newState = langReducer(initialState, action);

  t.is(newState, expectedState);
});

test('unrelated action type', t => {
  const action = {
    type: 'UNRELATED_ACTION_TYPE'
  };

  const newState = langReducer(initialState, action);

  t.is(newState, initialState);
});
