import test from 'ava';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';
import * as actions from '../../src/actions/postActions';

test('creating post', t => {
  const initialState = {
    posts: []
  };
  const store = createStore(rootReducer, initialState);
  const post = {
    title: 'New Post'
  };

  const action = actions.createPostSuccess(post);
  store.dispatch(action);

  const actual = store.getState().posts[0];
  t.deepEqual(actual, post);
});
