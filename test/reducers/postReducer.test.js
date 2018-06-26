import test from 'ava';
import * as types from '../../src/constants';
import postReducer from '../../src/reducers/postReducer';

test('load posts', t => {
  const initialState = [];
  const posts = [{ title: 'B' }, { title: 'A' }];
  const action = {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  };

  const newState = postReducer(initialState, action);

  t.deepEqual(newState, posts);
});

const initialState = [
  { _id: 2, title: 'B' },
  { _id: 1, title: 'A' }
];

test('create post', t => {
  const post = {
    _id: 3,
    title: 'C'
  };
  const action = {
    type: types.CREATE_POST_SUCCESS,
    post
  };

  const expectedState = [
    { _id: 3, title: 'C' },
    { _id: 2, title: 'B' },
    { _id: 1, title: 'A' }
  ];
  const newState = postReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('update post', t => {
  const post = {
    _id: 1,
    title: 'AAA'
  };
  const action = {
    type: types.UPDATE_POST_SUCCESS,
    post
  };

  const expectedState = [
    { _id: 2, title: 'B' },
    { _id: 1, title: 'AAA' }
  ];
  const newState = postReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('delete post', t => {
  const action = {
    type: types.DELETE_POST_SUCCESS,
    id: 1
  };

  const expectedState = [{ _id: 2, title: 'B' }];
  const newState = postReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('unrelated action type', t => {
  const action = {
    type: 'UNRELATED_ACTION_TYPE'
  };

  const newState = postReducer(initialState, action);

  t.deepEqual(newState, initialState);
});
