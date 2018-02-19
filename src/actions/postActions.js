import * as types from '../constants';
import PostApi from '../../app/mockPostApi';

export const loadPostsSuccess = (posts) => {
  return {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  };
};

export const createPostSuccess = (post) => {
  return {
    type: types.CREATE_POST_SUCCESS,
    post
  };
};

export const updatePostSuccess = (post) => {
  return {
    type: types.UPDATE_POST_SUCCESS,
    post
  };
};

export const deletePostSuccess = (id) => {
  return {
    type: types.DELETE_POST_SUCCESS,
    id
  };
};

export const loadPosts = () => {
  return (dispatch => {
    return PostApi.getAllPosts().then(posts => {
      dispatch(loadPostsSuccess(posts.reverse()));
    }).catch(error => {
      throw(error);
    });
  });
};

export const savePost = (post) => {
  const postId = post.id;
  return (dispatch => {
    return PostApi.savePost(post).then(post => {
      postId ? dispatch(updatePostSuccess(post)) :
        dispatch(createPostSuccess(post));
    }).catch(error => {
      throw(error);
    });
  });
};

export const deletePost = (id) => {
  return (dispatch => {
    return PostApi.deletePost(id).then(() => {
      dispatch(deletePostSuccess(id));
    }).catch(error => {
      throw(error);
    });
  });
};
