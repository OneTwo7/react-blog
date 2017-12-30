import test from 'ava';
import * as types from '../../src/constants';
import * as actions from '../../src/actions/postActions';
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
  { id: 2, title: 'B' },
  { id: 1, title: 'A' }
];

test('create post', t => {
  const post = {
    id: 3,
    title: 'C'
  };
  const action = {
    type: types.CREATE_POST_SUCCESS,
    post
  };

  const expectedState = [
    { id: 3, title: 'C' },
    { id: 2, title: 'B' },
    { id: 1, title: 'A' }
  ];
  const newState = postReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('update post', t => {
  const post = {
    id: 1,
    title: 'AAA'
  };
  const action = {
    type: types.UPDATE_POST_SUCCESS,
    post
  };

  const expectedState = [
    { id: 2, title: 'B' },
    { id: 1, title: 'AAA' }
  ];
  const newState = postReducer(initialState, action);

  t.deepEqual(newState, expectedState);
});

test('delete post', t => {
  const action = {
    type: types.DELETE_POST,
    id: 1
  };

  const expectedState = [{ id: 2, title: 'B' }];
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
