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

export const loadPosts = () => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    const { data } = await axios.get('/api/posts');
    dispatch(loadPostsSuccess(data));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});

export const savePost = (postData) => {
  const hasPostId = postData.has('_id');
  return (async dispatch => {
    dispatch(beginAjaxCall());
    try {
      if (hasPostId) {
        const { data } = await axios.put(`/api/posts`, postData);
        dispatch(updatePostSuccess(data));
        return data._id;
      } else {
        const { data } = await axios.post('/api/posts', postData);
        dispatch(createPostSuccess(data));
        return data._id;
      }
    } catch (e) {
      dispatchAjaxCallError(e, dispatch);
    }
  });
};

export const deletePost = (id) => (async dispatch => {
  dispatch(beginAjaxCall());
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch(deletePostSuccess(id));
  } catch (e) {
    dispatchAjaxCallError(e, dispatch);
  }
});
