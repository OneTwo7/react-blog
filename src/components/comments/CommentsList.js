import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

const CommentsList = ({ auth, comments, onEdit, onDelete }) => {
  return comments.map((comment, idx) => (
    <Comment
      key={idx}
      auth={auth}
      comment={comment}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));
};

CommentsList.propTypes = {
  auth: PropTypes.object,
  comments: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CommentsList;
