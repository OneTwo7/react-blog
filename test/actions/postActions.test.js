import test from 'ava';
import * as postActions from '../../src/actions/postActions';
import * as types from '../../src/constants';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const post = {
  title: 'title',
  content: 'content',
  category: 'category'
};

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
  const expectedAction = {
    type: types.CREATE_POST_SUCCESS,
    post
  };

  const action = postActions.createPostSuccess(post);

  t.deepEqual(action, expectedAction);
});

test('updatePostSuccess', t => {
  const expectedAction = {
    type: types.UPDATE_POST_SUCCESS,
    post
  };

  const action = postActions.updatePostSuccess(post);

  t.deepEqual(action, expectedAction);
});

test('deletePostSuccess', t => {
  const id = Math.random();
  const expectedAction = {
    type: types.DELETE_POST_SUCCESS,
    id
  };

  const action = postActions.deletePostSuccess(id);

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
      t.is(actions[0].type, types.BEGIN_AJAX_CALL);
      t.is(actions[1].type, types.LOAD_POSTS_SUCCESS);
      resolve();
    });
  });
});

test('savePost', t => {


  return new Promise((resolve, reject) => {
    const expectedAction = {
      type: types.UPDATE_POST_SUCCESS
    };
    const store = mockStore({ posts: [] }, expectedAction);
    store.dispatch(postActions.savePost(
      Object.assign({}, post, { id: Math.random() }))
    ).then(() => {
      const actions = store.getActions();
      t.is(actions[0].type, types.BEGIN_AJAX_CALL);
      t.is(actions[1].type, types.UPDATE_POST_SUCCESS);
      resolve();
    });
  });

  return new Promise((resolve, reject) => {
    const expectedAction = {
      type: types.CREATE_POST_SUCCESS
    };
    const store = mockStore({ posts: [] }, expectedAction);
    store.dispatch(postActions.savePost(post)).then(() => {
      const actions = store.getActions();
      t.is(actions[0].type, types.BEGIN_AJAX_CALL);
      t.is(actions[1].type, types.CREATE_POST_SUCCESS);
      resolve();
    });
  });
});
