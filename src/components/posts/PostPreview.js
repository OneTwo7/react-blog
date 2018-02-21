import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostPreview = ({ post, onDeleteClick, onMouseEnter, onMouseLeave }) => (
  <div className="post-wrapper col-md-4">
    <div
      id={post.id}
      className="post-preview"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="post-top">
        <div className="post-category">
          {post.category}
        </div>
        <div className="post-comments">
          <i className="far fa-comment" />
          <span className="count">0</span>
        </div>
      </div>
      <div className="post-controls">
        <Link to={`/posts/${post.id}/edit`}>
          Edit
        </Link>
        <button
          id={`delete-${post.id}`}
          type="button"
          className="btn btn-link"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
      <div className="post-bottom">
        <h2 className="post-title">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
      </div>
    </div>
  </div>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default PostPreview;
