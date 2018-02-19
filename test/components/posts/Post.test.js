import test from 'ava';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Post from '../../../src/components/posts/Post';

const mockStore = configureStore();
const post1 = {
  id:      'first',
  title:   'First',
  content: 'Content 1'
};
const post2 = {
  id:      'second',
  title:   'Second',
  content: 'Content 2'
};
const initialState = {
  posts: [post1, post2]
};
const store = mockStore(initialState);
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
      <Post {...props} />
    </Router>
  </Provider>
);

test('layout', t => {
  t.is(wrapper.find('.post').length, 1);
  t.is(wrapper.find('h1').text(), 'First');
  t.is(wrapper.find('#post-content').text(), 'Content 1');
});
