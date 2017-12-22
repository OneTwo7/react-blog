import React from 'react';
import { Route } from 'react-router';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PostForm from './posts/PostForm';
import Post from './posts/Post';

const App = () => (
  <div className="container">
    <Header />
    <Route exact path="/" component={HomePage} />
    <Route path="/new_post" component={PostForm} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/post/edit/:id" component={PostForm} />
  </div>
);

export default App;
