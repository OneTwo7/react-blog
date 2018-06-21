import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostPreview = ({ post, onDeleteClick, onLoad }) => (
  <div className="post-wrapper col-md-4">
    <Link to={`/posts/${post._id}`} className="post-link">
      <div id={post._id} className="post-preview">
        <div className="post-preview-top">
          {
            !!post.pictures.length &&
            <img src={post.pictures[0].url} onLoad={onLoad} />
          }
        </div>
        <div className="post-preview-bottom">
          <h2 className="post-title">{post.title}</h2>
        </div>
      </div>
    </Link>
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
  </div>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostPreview;
