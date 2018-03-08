import React from 'react';
import { fromNow } from '../../utils/formatDate';
import PropTypes from 'prop-types';

const CommentsList = ({ comments, users, onEditClick, onDeleteClick }) => {
  const renderComments = () => (
    comments.map(comment => (
      <div key={comment.id} className="comment">
        <div className="comment-wrapper">
          <div className="comment-top">
            <div>{users[comment.author].name}</div>
            <div>{fromNow(comment.created_at)}</div>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
        <div className="comment-controls">
          <button
            id={`edit-${comment.id}`}
            type="button"
            onClick={onEditClick}
            className="btn btn-link"
          >
            edit
          </button>
          <button
            id={`delete-${comment.id}`}
            type="button"
            onClick={onDeleteClick}
            className="btn btn-link"
          >
            delete
          </button>
        </div>
      </div>
    ))
  );

  return renderComments();
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  users: PropTypes.object,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CommentsList;
