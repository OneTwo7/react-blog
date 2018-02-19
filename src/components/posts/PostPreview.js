import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostPreview = ({ post, onDeleteClick }) => (
  <div className="post-wrapper col-md-4">
    <div className="post-preview">
      <h2 className="post-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
    </div>
    <div className="post-controls">
      <Link
        to={`/posts/${post.id}/edit`}
        className="btn btn-primary"
      >
        Edit
      </Link>
      <button
        id={`delete-${post.id}`}
        type="button"
        className="btn btn-danger"
        onClick={onDeleteClick}
      >
        Delete
      </button>
    </div>
  </div>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default PostPreview;
