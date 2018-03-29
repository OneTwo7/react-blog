import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostPreview = ({ post, onDeleteClick }) => (
  <div className="post-wrapper col-md-4">
    <div id={post._id} className="post-preview">
      <div className="post-preview-top">
        <div className="post-category">
          {post.category}
        </div>
        <div className="post-comments">
          <i className="far fa-comment" />
          <span className="count">{post.comments}</span>
        </div>
      </div>
      <div className="post-controls">
        <Link to={`/posts/${post._id}/edit`}>
          edit
        </Link>
        <button
          id={`delete-${post._id}`}
          type="button"
          className="btn btn-link"
          onClick={onDeleteClick}
        >
          delete
        </button>
      </div>
      <div className="post-preview-bottom">
        <h2 className="post-title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
      </div>
    </div>
  </div>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default PostPreview;
