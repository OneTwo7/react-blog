import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import App from './components/App';
import { loadPosts } from './actions/postActions';
import { getLanguage } from './actions/langActions';
import { getCurrentUser } from './actions/authActions';
import 'react-notifications/lib/notifications.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(loadPosts());
store.dispatch(getLanguage());
store.dispatch(getCurrentUser());

render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('app')
);
