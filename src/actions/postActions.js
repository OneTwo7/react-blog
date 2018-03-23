import * as types from '../constants';
import PostApi from '../../app/mocks/mockPostApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

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
    dispatch(beginAjaxCall());
    return PostApi.getAllPosts().then(posts => {
      dispatch(loadPostsSuccess(posts.reverse()));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};

export const savePost = (post) => {
  const postId = post.id;
  return (dispatch => {
    dispatch(beginAjaxCall());
    return PostApi.savePost(post).then(post => {
      postId ? dispatch(updatePostSuccess(post)) :
        dispatch(createPostSuccess(post));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};

export const deletePost = (id) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return PostApi.deletePost(id).then(() => {
      dispatch(deletePostSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};
