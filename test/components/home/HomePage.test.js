import test from 'ava';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import HomePage from '../../../src/components/home/HomePage';

const mockStore = configureStore();
let posts = [];
const start = 'a'.charCodeAt(0);
const stop = start + 10;
for (let i = start, char; i < stop; i++) {
  char = String.fromCharCode(i);
  posts.push({
    id: char,
    title: char.toUpperCase(),
    content: 'Content ' + char
  });
}
const store = mockStore({ posts });
const wrapper = mount(
  <Provider store={store}>
    <Router>
      <HomePage />
    </Router>
  </Provider>
);

test('correct home page layout', t => {
  t.is(wrapper.find('h2').length, 10);
  t.is(wrapper.find('.post p').at(3).text(), 'Content d');
});
