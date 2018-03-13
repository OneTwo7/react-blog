import test from 'ava';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/reducers';
import { mount } from 'enzyme';
import PostPage from '../../../src/components/posts/PostPage';

const post1 = {
  id:      'first',
  title:   'First',
  content: 'Content 1',
  tags:    ''
};
const post2 = {
  id:      'second',
  title:   'Second',
  content: 'Content 2',
  tags:    ''
};
const initialState = {
  posts: [post1, post2],
  users: []
};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
const props = {
  match: {
    params: {
      id: 'first'
    }
  }
};
const wrapper = mount(
  <Provider store={store}>
    <Router>
      <PostPage {...props} />
    </Router>
  </Provider>
);

test('layout', t => {
  t.is(wrapper.find('#post').length, 1);
  t.is(wrapper.find('h1').text(), 'First');
});
