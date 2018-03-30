import * as types from '../constants';
import { beginAjaxCall, dispatchAjaxCallError } from './ajaxStatusActions';
import axios from 'axios';

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
    return axios.get('/api/posts').then(({ data }) => {
      dispatch(loadPostsSuccess(data.reverse()));
    }).catch(error => {
      dispatchAjaxCallError(error, dispatch);
    });
  });
};

export const savePost = (post) => {
  const postId = post._id;
  return (dispatch => {
    dispatch(beginAjaxCall());
    if (postId) {
      return axios.put(`/api/posts/${postId}`, post).then(({ data }) => {
        dispatch(updatePostSuccess(data));
      }).catch(error => {
        dispatchAjaxCallError(error, dispatch);
      });
    }
    return axios.post('/api/posts', post).then(({ data }) => {
      dispatch(createPostSuccess(data));
    }).catch(error => {
      dispatchAjaxCallError(error, dispatch);
    });
  });
};

export const deletePost = (id) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return axios.delete(`/api/posts/${id}`).then(() => {
      dispatch(deletePostSuccess(id));
    }).catch(error => {
      dispatchAjaxCallError(error, dispatch);
    });
  });
};
