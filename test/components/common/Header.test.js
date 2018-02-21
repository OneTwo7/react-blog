import React from 'react';
import test from 'ava';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/reducers';
import { mount } from 'enzyme';
import Header from '../../../src/components/common/Header';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const wrapper = mount(
  <Provider store={store}>
    <Router>
      <Header />
    </Router>
  </Provider>
);

test('layout', t => {
  t.is(wrapper.find('nav').length, 1);
  t.is(wrapper.find('a').length, 2);
  t.is(wrapper.find('a[href="/"]').text(), 'Home');
  t.is(wrapper.find('a[href="/new_post"]').text(), 'New Post');
});
