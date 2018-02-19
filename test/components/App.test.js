import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/reducers';
import App from '../../src/components/App';

const initialState = { posts: [], auth: null };

test('renders without crashing', t => {
  const div = document.createElement('div');
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
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
