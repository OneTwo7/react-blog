import * as types from '../constants';

const postReducer = (state = [], action) => {
  let posts = null;
  let idx = -1;

  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return action.posts;
    case types.CREATE_POST_SUCCESS:
      return [Object.assign({}, action.post), ...state];
    case types.UPDATE_POST_SUCCESS:
      posts = [...state];
      idx = posts.findIndex(a => a.id == action.post.id);
      posts.splice(idx, 1, Object.assign({}, action.post));
      return posts;
    case types.DELETE_POST_SUCCESS:
      return [...state.filter(post => post.id !== action.id)];
    default:
      return state;
  }
};

export default postReducer;
