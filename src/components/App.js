import React from 'react';
import { Route } from 'react-router';
import Header from './common/Header';
import HomePage from './home/HomePage';
import NewPost from './posts/NewPost';
import Post from './posts/Post';

const App = () => (
  <div className="container">
    <Header />
    <Route exact path="/" component={HomePage} />
    <Route path="/new_post" component={NewPost} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/post/edit/:id" component={NewPost} />
  </div>
);

export default App;
