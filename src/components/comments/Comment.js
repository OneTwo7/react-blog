import React from 'react';
import { fromNow } from '../../utils/formatDate';
import PropTypes from 'prop-types';

const Comment = ({ auth, comment, onEdit, onDelete }) => {
  const { _id, author, content, created_at } = comment;
  const isAdmin = auth.roles && auth.roles.includes('admin');

  return (
    <div className="comment">
      <div className="comment-wrapper">
        <div className="comment-top">
          <div>
            <div>{author.name}</div>
            <div className="timestamp">{fromNow(created_at)}</div>
          </div>
          {
            auth && auth._id && (isAdmin || auth._id === author._id) &&
            <div className="comment-controls">
              <button
                data-target={_id}
                type="button"
                onClick={onEdit}
                className="btn btn-link"
              >
                edit
              </button>
              <button
                data-target={_id}
                type="button"
                onClick={onDelete}
                className="btn btn-link"
              >
                delete
              </button>
            </div>
          }
        </div>
        <div className="comment-content">{content}</div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  auth: PropTypes.object,
  comment: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Comment;
