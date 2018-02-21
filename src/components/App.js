import React from 'react';
import { Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PostForm from './posts/PostForm';
import Post from './posts/Post';

const App = () => (
  <div>
    <Header />
    <div className="container">
      <Route exact path="/" component={HomePage} />
      <Route path="/new_post" component={PostForm} />
      <Route exact path="/posts/:id" component={Post} />
      <Route exact path="/posts/:id/edit" component={PostForm} />
    </div>
  </div>
);

export default App;
