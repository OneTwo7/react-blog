import test from 'ava';
import * as types from '../../src/constants';
import commentReducer from '../../src/reducers/commentReducer';

const comments = [
  { _id: 1, content: 'Hello' },
  { _id: 2, content: 'Glad to meet you! ' },
  { _id: 3, content: 'Good bye' }
];


test('load post comments success', t => {
  const initialState = [];

  const action = {
    type: types.LOAD_POST_COMMENTS,
    comments
  };

  const expectedState = [...comments];

  const newState = commentReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});


test('create comment success', t => {
  const initialState = comments;

  const comment = { _id: 4, content: 'What is going on?' };

  const action = {
    type: types.CREATE_COMMENT_SUCCESS,
    comment
  };

  const expectedState = [Object.assign({}, comment), ...comments];

  const newState = commentReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});


test('update comment success', t => {
  const initialState = comments;

  const comment = { _id: 2, content: 'Is that right?' };

  const action = {
    type: types.UPDATE_COMMENT_SUCCESS,
    comment
  };

  const expectedState = [
    { _id: 1, content: 'Hello' },
    { _id: 2, content: 'Is that right?' },
    { _id: 3, content: 'Good bye' }
  ];

  const newState = commentReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});


test('delete comment success', t => {
  const initialState = comments;

  const action = {
    type: types.DELETE_COMMENT_SUCCESS,
    id: 1
  };

  const expectedState = [
    { _id: 2, content: 'Glad to meet you! ' },
    { _id: 3, content: 'Good bye' }
  ];

  const newState = commentReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});
