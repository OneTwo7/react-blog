import React from 'react';
import { fromNow } from '../../utils/formatDate';
import PropTypes from 'prop-types';

const Comment = ({ comment, users, onEditClick, onDeleteClick }) => (
  <div className="comment">
    <div className="comment-wrapper">
      <div className="comment-top">
        <div>
          <div>{users[comment.author].name}</div>
          <div className="timestamp">{fromNow(comment.created_at)}</div>
        </div>
        <div className="comment-controls">
          <button
            id={`edit-${comment._id}`}
            type="button"
            onClick={onEditClick}
            className="btn btn-link"
          >
            edit
          </button>
          <button
            id={`delete-${comment._id}`}
            type="button"
            onClick={onDeleteClick}
            className="btn btn-link"
          >
            delete
          </button>
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object,
  users: PropTypes.object,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Comment;
