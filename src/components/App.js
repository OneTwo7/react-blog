import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import PostForm from './posts/PostForm';
import PostPage from './posts/PostPage';
import ResetForm from './home/ResetForm';
import Footer from './common/Footer';
import ProgressBar from './common/ProgressBar';
import SocialLoginSuccess from './common/SocialLoginSuccess';
import NoMatch from './common/NoMatch';
import { NotificationContainer } from 'react-notifications';

const App = () => (
  <div>
    <Header />
    <div id="main" className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/new_post" component={PostForm} />
        <Route exact path="/posts/:id" component={PostPage} />
        <Route exact path="/posts/:id/edit" component={PostForm} />
        <Route path="/password_reset" component={ResetForm} />
        <Route path="/auth/success" component={SocialLoginSuccess} />
        <Route component={NoMatch} />
      </Switch>
    </div>
    <Footer />
    <ProgressBar />
    <NotificationContainer />
  </div>
);

export default App;
