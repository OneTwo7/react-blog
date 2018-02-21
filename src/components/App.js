import React from 'react';
import { Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PostForm from './posts/PostForm';
import Post from './posts/Post';
import Footer from './common/Footer';

const App = () => (
  <div>
    <Header />
    <div id="main" className="container">
      <Route exact path="/" component={HomePage} />
      <Route path="/new_post" component={PostForm} />
      <Route exact path="/posts/:id" component={Post} />
      <Route exact path="/posts/:id/edit" component={PostForm} />
    </div>
    <Footer />
  </div>
);

export default App;
