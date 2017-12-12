import React from 'react';
import { Route } from 'react-router';
import Header from './common/Header';
import HomePage from './home/HomePage';
import NewPost from './posts/NewPost';

const App = () => (
  <div className="container-fluid">
    <Header />
    <Route exact path="/" component={HomePage} />
    <Route path="/new_post" component={NewPost} />
  </div>
);

export default App;
