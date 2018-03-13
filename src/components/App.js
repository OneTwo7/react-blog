import React from 'react';
import { Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PostForm from './posts/PostForm';
import PostPage from './posts/PostPage';
import Footer from './common/Footer';
import ProgressBar from './common/ProgressBar';
import { NotificationContainer } from 'react-notifications';

const App = () => (
  <div>
    <Header />
    <div id="main" className="container">
      <Route exact path="/" component={HomePage} />
      <Route path="/new_post" component={PostForm} />
      <Route exact path="/posts/:id" component={PostPage} />
      <Route exact path="/posts/:id/edit" component={PostForm} />
    </div>
    <Footer />
    <ProgressBar />
    <NotificationContainer />
  </div>
);

export default App;
