import * as types from '../constants';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import axios from 'axios';

const handleError = (error, dispatch) => {
  dispatch(ajaxCallError());
  throw(error);
};

export const loadPostCommentsSuccess = (comments) => {
  return {
    type: types.LOAD_POST_COMMENTS_SUCCESS,
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

export const loadComments = (id) => {
  return (dispatch => {
    return axios.get(`/api/posts/${id}/comments`).then(({ data }) => {
      dispatch(loadPostCommentsSuccess(data.reverse()));
    }).catch(error => {
      throw(error);
    });
  });
};

export const saveComment = (comment) => {
  const commentId = comment._id;
  const postId    = comment.post_id;
  return (dispatch => {
    dispatch(beginAjaxCall());
    if (commentId) {
      return axios.put(`/api/posts/${postId}/comments/${commentId}`, comment)
      .then(({ data }) => {
        dispatch(updateCommentSuccess(data));
      }).catch(error => handleError(error, dispatch));
    }
    return axios.post(`/api/posts/${postId}/comments`, comment)
    .then(({ data }) => {
      dispatch(createCommentSuccess(data));
    }).catch(error => handleError(error, dispatch));
  });
};

export const deleteComment = (postId, commentId) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.delete(`/api/posts/${postId}/comments/${commentId}`)
    .then(() => {
      dispatch(deleteCommentSuccess(commentId, postId));
    }).catch(error => handleError(error, dispatch));
  });
};
