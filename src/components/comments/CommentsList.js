import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

const CommentsList = ({ auth, lang, comments, onEdit, onDelete }) => {
  return comments.map((comment, idx) => (
    <Comment
      key={idx}
      auth={auth}
      lang={lang}
      comment={comment}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));
};

CommentsList.propTypes = {
  auth: PropTypes.object,
  comments: PropTypes.array,
  lang: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CommentsList;
