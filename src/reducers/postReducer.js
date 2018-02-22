import * as types from '../constants';

const findPostIndex = (posts, id) => {
  return posts.findIndex(p => p.id === id);
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
      idx = findPostIndex(posts, action.post.id);
      posts.splice(idx, 1, Object.assign({}, action.post));
      return posts;
    case types.DELETE_POST_SUCCESS:
      return [...state.filter(post => post.id !== action.id)];
    case types.CREATE_COMMENT_SUCCESS:
      posts = [...state];
      idx = findPostIndex(posts, action.comment.post_id);
      post = Object.assign({}, posts[idx]);
      post.comments++;
      posts.splice(idx, 1, post);
      return posts;
    case types.DELETE_COMMENT_SUCCESS:
      posts = [...state];
      idx = findPostIndex(posts, action.postId);
      post = Object.assign({}, posts[idx]);
      post.comments--;
      posts.splice(idx, 1, post);
      return posts;
    default:
      return state;
  }
};

export default postReducer;
