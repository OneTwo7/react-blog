import test from 'ava';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import HomePage from '../../src/components/home/HomePage';

const mockStore = configureStore();
const initialState = {
  posts: [
    { id: 'e', title: 'E', content: 'Content e' },
    { id: 'd', title: 'D', content: 'Content d' },
    { id: 'c', title: 'C', content: 'Content c' },
    { id: 'b', title: 'B', content: 'Content b' },
    { id: 'a', title: 'A', content: 'Content a' }
  ]
};
const store = mockStore(initialState);
const wrapper = mount(
  <Provider store={store}>
    <Router>
      <HomePage />
    </Router>
  </Provider>
);

test('correct home page layout', t => {
  t.is(wrapper.find('h2').length, 5);
  t.is(wrapper.find('.post p').at(3).text(), 'Content b');
});
