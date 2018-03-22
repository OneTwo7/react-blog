import delayObj from './delay';
import { sanitizeHTML } from '../src/utils/editorHelpers';

const env = process.env.NODE_ENV || 'development';
const delay = delayObj[env];

const posts = [];

const text = '<h2>Lorem ipsum dolor sit amet</h2>' +
'Consectetur adipiscing elit. Sed arcu nunc, porttitor in pellentesque ' +
'vitae, lobortis vitae lacus. Pellentesque et neque porta, volutpat nisi ' +
'in, interdum ipsum. Praesent pulvinar nibh vel fringilla pharetra. Sed ac ' +
'varius nunc. Maecenas in ipsum in velit consequat porttitor. Maecenas ' +
'augue mauris, efficitur id orci a, fringilla placerat quam. Cras rutrum ' +
'enim risus. In dictum, quam at commodo sollicitudin, lacus risus placerat ' +
'metus, vel sodales nunc nulla blandit <a href="/">molestie</a> enim.';

const code = `
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
`;

const shell = `
me@laptop:~$ mongo
> use my_db
> show collections
> db.users.findOne({ name: 'Peter' })
`;

const content = JSON.stringify([
  { id: "field-0", type: "text", content:  text },
  { id: "field-1", type: "code", content:  sanitizeHTML(code) },
  { id: "field-2", type: "shell", content: shell }
]);

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (post) => {
  return replaceAll(post.title.toLowerCase(), ' ', '-');
};

for (let i = 0; i < 100; i++) {
  posts.push({
    author: 1,
    title: `Post ${i}`,
    content: content,
    category: 'sample',
    tags: 'sample loremipsum text default',
    comments: 3,
    created_at: new Date()
  });
  posts[i].id = generateId(posts[i]);
}

class PostApi {
  static getAllPosts () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], posts));
      }, delay);
    });
  }

  static savePost (post) {
    post = Object.assign({}, post); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minPostTitleLength = 4;
        if (!post.title || post.title.length < minPostTitleLength) {
          reject(`Title must be at least ${minPostTitleLength} characters.`);
        }
        if (!post.content) {
          reject('You must provide content.');
        }
        if (!post.category) {
          reject('You must provide category.');
        }

        if (post.id) {
          const existingPostIndex = posts.findIndex(a => a.id == post.id);
          posts.splice(existingPostIndex, 1, post);
        } else {
          post.id = generateId(post);
          post.created_at = new Date();
          post.comments = 0;
          posts.push(post);
        }

        resolve(post);
      }, delay);
    });
  }

  static deletePost (postId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfpostToDelete = posts.findIndex(post => {
          post.id == postId;
        });
        posts.splice(indexOfpostToDelete, 1);
        resolve();
      }, delay);
    });
  }

  static updateCommentsCount (id, diff) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = posts.findIndex(p => p.id === id);
        posts[idx].comments += diff;
        resolve();
      }, delay);
    });
  }
}

export default PostApi;
