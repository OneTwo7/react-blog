import React from 'react';
import { fromNow } from '../../utils/formatDate';
import PropTypes from 'prop-types';

const PostContent = ({ author, post }) => (
  <section id="post" className="col-md-8 offset-md-2">
    <div className="post-top">
      <div>
        <div>{author.name}</div>
        <div className="timestamp">{fromNow(post.created_at)}</div>
      </div>
      <div>{post.category}</div>
    </div>
    <h1 id="post-title">{post.title}</h1>
    <p id="post-content">{post.content}</p>
    <div id="post-tags">
      {
        post.tags.length > 0 &&
        post.tags.split(' ').map((tag, idx) => (
          <div key={idx} className="tag">
            {tag}
          </div>
        ))
      }
    </div>
    <div>{author.name}</div>
  </section>
);

PostContent.propTypes = {
  author: PropTypes.object,
  post: PropTypes.object
};

export default PostContent;
