import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

const CommentsList = ({ comments, users, onEditClick, onDeleteClick }) => {
  const renderComments = () => (
    comments.map(comment => (
      <Comment
        key={comment._id}
        comment={comment}
        users={users}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
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
