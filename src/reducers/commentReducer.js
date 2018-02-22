import * as types from '../constants';

const findCommentIndex = (comments, id) => {
  return comments.findIndex(c => c.id === id);
};

const commentReducer = (state = [], action) => {
  let comments = null;
  let idx = -1;

  switch (action.type) {
    case types.LOAD_POST_COMMENTS_SUCCESS:
      return [...action.comments];
    case types.CREATE_COMMENT_SUCCESS:
      return [Object.assign({}, action.comment), ...state];
    case types.UPDATE_COMMENT_SUCCESS:
      comments = [...state];
      idx = findCommentIndex(comments, action.comment.id);
      comments.splice(idx, 1, Object.assign({}, action.comment));
      return comments;
    case types.DELETE_COMMENT_SUCCESS:
      comments = [...state];
      idx = findCommentIndex(comments, action.id);
      comments.splice(idx, 1);
      return comments;
    default:
      return state;
  }
};

export default commentReducer;
