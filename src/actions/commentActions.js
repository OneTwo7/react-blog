import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import axios from 'axios';

export const loadPostCommentsSuccess = (comments) => {
  return {
    type: types.LOAD_POST_COMMENTS,
    comments
  };
};

export const createCommentSuccess = (comment) => {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    comment
  };
};

export const updateCommentSuccess = (comment) => {
  return {
    type: types.UPDATE_COMMENT_SUCCESS,
    comment
  };
};

export const deleteCommentSuccess = (id, postId) => {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    id,
    postId
  };
};

export const loadComments = (id) => (async dispatch => {
  try {
    const { data } = await axios.get(`/api/posts/${id}/comments`);
    dispatch(loadPostCommentsSuccess(data));
  } catch (e) {
    throw(e);
  }
});

export const saveComment = (comment) => {
  const commentId = comment._id;
  const postId    = comment.post_id;
  return (async dispatch => {
    dispatch(beginAjaxCall());
    try {
      if (commentId) {
        const path = `/api/posts/${postId}/comments/${commentId}`;
        const { data } = await axios.put(path, comment);
        dispatch(updateCommentSuccess(data));
      } else {
        const path = `/api/posts/${postId}/comments`;
        const { data } = await axios.post(path, comment);
        dispatch(createCommentSuccess(data));
      }
    } catch (e) {
      dispatchAjaxCallError(e, dispatch);
    }
  });
};

export const deleteComment = (commentId, postId) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
    dispatch(deleteCommentSuccess(commentId, postId));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});
