import test from 'ava';
import * as postActions from '../../src/actions/postActions';
import * as types from '../../src/constants';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

test('loadPostsSuccess', t => {
  const posts = ['a', 'b', 'c'];
  const expectedAction = {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  };

  const action = postActions.loadPostsSuccess(posts);

  t.deepEqual(action, expectedAction);
});

test('createPostSuccess', t => {
  const post = { title: 'title', text: 'text' };
  const expectedAction = {
    type: types.CREATE_POST_SUCCESS,
    post
  };

  const action = postActions.createPostSuccess(post);

  t.deepEqual(action, expectedAction);
});

test('updatePostSuccess', t => {
  const post = { title: 'title', text: 'text' };
  const expectedAction = {
    type: types.UPDATE_POST_SUCCESS,
    post
  };

  const action = postActions.updatePostSuccess(post);

  t.deepEqual(action, expectedAction);
});

test('deletePost', t => {
  const id = Math.random();
  const expectedAction = {
    type: types.DELETE_POST,
    id
  };

  const action = postActions.deletePost(id);

  t.deepEqual(action, expectedAction);
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

test('loadPosts', t => {
  return new Promise((resolve, reject) => {
    const expectedAction = {
      type: types.LOAD_POSTS_SUCCESS
    };
    const store = mockStore({ posts: [] }, expectedAction);
    store.dispatch(postActions.loadPosts()).then(() => {
      const actions = store.getActions();
      t.is(actions[0].type, types.LOAD_POSTS_SUCCESS);
      resolve();
    });
  });
});

test('savePost', t => {
  return new Promise((resolve, reject) => {
    const post = {
      title: 'title',
      text: 'text'
    };
    const expectedAction = {
      type: types.UPDATE_POST_SUCCESS
    };
    const store = mockStore({ posts: [] }, expectedAction);
    store.dispatch(postActions.savePost(
      Object.assign({}, post, { id: Math.random() }))
    ).then(() => {
      const actions = store.getActions();
      t.is(actions[0].type, types.UPDATE_POST_SUCCESS);
      resolve();
    });
  });

  return new Promise((resolve, reject) => {
    const post = {
      title: 'title',
      text: 'text'
    };
    const expectedAction = {
      type: types.CREATE_POST_SUCCESS
    };
    const store = mockStore({ posts: [] }, expectedAction);
    store.dispatch(postActions.savePost(post)).then(() => {
      const actions = store.getActions();
      t.is(actions[0].type, types.CREATE_POST_SUCCESS);
      resolve();
    });
  });
});
