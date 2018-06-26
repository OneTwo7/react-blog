import test from 'ava';
import * as commentActions from '../../src/actions/commentActions';
import * as types from '../../src/constants';

const comment = {
  content: 'Hello'
};

test('loadPostCommentsSuccess', t => {
  const comments = [
    { _id: 1, content: 'Hello' },
    { _id: 2, content: 'How are you doing?' }
  ];

  const expectedAction = {
    type: types.LOAD_POST_COMMENTS_SUCCESS,
    comments
  };

  const action = commentActions.loadPostCommentsSuccess(comments);

  t.deepEqual(action, expectedAction);
});

test('createCommentSuccess', t => {
  const expectedAction = {
    type: types.CREATE_COMMENT_SUCCESS,
    comment
  };

  const action = commentActions.createCommentSuccess(comment);

  t.deepEqual(action, expectedAction);
});

test('updateCommentSuccess', t => {
  const expectedAction = {
    type: types.UPDATE_COMMENT_SUCCESS,
    comment
  };

  const action = commentActions.updateCommentSuccess(comment);

  t.deepEqual(action, expectedAction);
});

test('deleteCommentSuccess', t => {
  const id = 1;
  const postId = 1;

  const expectedAction = {
    type: types.DELETE_COMMENT_SUCCESS,
    id,
    postId
  };

  const action = commentActions.deleteCommentSuccess(id, postId);

  t.deepEqual(action, expectedAction);
});
