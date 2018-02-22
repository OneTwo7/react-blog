import * as types from '../constants';
import CommentApi from '../../app/mockCommentApi';

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
    return CommentApi.getCommentsByPostId(id).then(comments => {
      dispatch(loadPostCommentsSuccess(comments.reverse()));
    }).catch(error => {
      throw(error);
    });
  });
};

export const saveComment = (comment) => {
  const commentId = comment.id;
  return (dispatch => {
    return CommentApi.saveComment(comment).then(comment => {
      commentId ? dispatch(updateCommentSuccess(comment)) :
        dispatch(createCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  });
};

export const deleteComment = (id) => {
  return (dispatch => {
    return CommentApi.deleteComment(id).then(postId => {
      dispatch(deleteCommentSuccess(id, postId));
    }).catch(error => {
      throw(error);
    });
  });
};
