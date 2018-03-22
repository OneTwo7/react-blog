import React from 'react';
import { fromNow } from '../../utils/formatDate';
import PropTypes from 'prop-types';

const Post = ({ author, post }) => (
  <section id="post" className="col-md-8 offset-md-2">
    <div className="post-top">
      <div>
        <div>{author.name}</div>
        <div className="timestamp">{fromNow(post.created_at)}</div>
      </div>
      <div>{post.category}</div>
    </div>
    <h1 id="post-title">{post.title}</h1>
    <div id="post-content" />
    <div id="post-tags">
      {
        post.tags.length > 0 &&
        post.tags.split(' ').map((tag, idx) => (
          <div key={idx} className="post-tag">
            {tag}
          </div>
        ))
      }
    </div>
    <div>{author.name}</div>
  </section>
);

Post.propTypes = {
  author: PropTypes.object,
  post: PropTypes.object
};

export default Post;
