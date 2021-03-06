import test from 'ava';
import * as postActions from '../../src/actions/postActions';
import * as types from '../../src/constants';

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
