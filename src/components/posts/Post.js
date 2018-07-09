import React from 'react';
import { fromNow } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Post = ({ post, post: { _id, author, tags }, auth, onClick }) => (
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
    {
      auth && auth._id === author._id &&
      <div className="post-controls">
        <Link to={`/posts/${_id}/edit`}>
          edit
        </Link>
        <button
          id={`delete-${_id}`}
          type="button"
          className="btn btn-link"
          onClick={onClick}
        >
          delete
        </button>
      </div>
    }
    <div id="post-tags">
      {
        tags.length > 0 &&
        tags.split(' ').map((tag, idx) => (
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
  post: PropTypes.object,
  auth: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

export default Post;
