import test from 'ava';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import PostForm from '../../../src/components/posts/PostForm';

const mockStore = configureStore();
const initialState = {
  posts: []
};
const store = mockStore(initialState);
const props = {
  match: {
    params: {}
  },
  history: {}
};

const wrapper = mount(
  <Provider store={store}>
    <Router>
      <PostForm {...props} />
    </Router>
  </Provider>
);

test('title length validation', t => {
  const submitBtn = wrapper.find('input').last();
  t.is(submitBtn.prop('type'), 'submit');
  submitBtn.simulate('click');
  const alert = wrapper.find('.alert');
  t.truthy(alert.length);
  t.is(alert.at(0).text(), 'Title must be at least 4 characters.');
});
