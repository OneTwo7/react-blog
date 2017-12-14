import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { loadPosts } from './actions/postActions';
import './css/imported.css';

const store = configureStore();
store.dispatch(loadPosts());

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
