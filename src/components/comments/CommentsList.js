import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

const CommentsList = ({ auth, comments, users, onEdit, onDelete }) => {
  return comments.map(comment => (
    <Comment
      key={comment._id}
      auth={auth}
      comment={comment}
      users={users}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));
};

CommentsList.propTypes = {
  auth: PropTypes.object,
  comments: PropTypes.array,
  users: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CommentsList;
