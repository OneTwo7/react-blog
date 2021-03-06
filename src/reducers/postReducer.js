import * as types from '../constants';

const findPostIndex = (posts, postId) => {
  return posts.findIndex(({ _id }) => _id === postId);
};

const postReducer = (state = [], action) => {
  let posts = null;
  let idx = -1;
  let post = null;

  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return action.posts;
    case types.CREATE_POST_SUCCESS:
      return [Object.assign({}, action.post), ...state];
    case types.UPDATE_POST_SUCCESS:
      posts = [...state];
      idx = findPostIndex(posts, action.post._id);
      posts.splice(idx, 1, Object.assign({}, action.post));
      return posts;
    case types.DELETE_POST_SUCCESS:
      return [...state.filter(post => post._id !== action.id)];
    default:
      return state;
  }
};

export default postReducer;
