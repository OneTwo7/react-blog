import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from '../../src/components/App';

const mockStore = configureStore();
const initialState = { posts: [] };

test('renders without crashing', t => {
  const div = document.createElement('div');
  const store = mockStore(initialState);
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    div
  );
  t.pass();
});
