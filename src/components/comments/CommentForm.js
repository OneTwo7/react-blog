import React from 'react';
import TextareaInput from '../common/TextareaInput';
import PropTypes from 'prop-types';

const CommentForm = ({ comment, errors, onChange, onClick, cancelEdit }) => (
  <form id="comment-form">
    <TextareaInput
      name="content"
      value={comment.content}
      onChange={onChange}
      error={errors.content}
      placeholder="Write a response..."
    />
    <input
      type="submit"
      value="Submit"
      onClick={onClick}
      className="btn btn-primary"
    />
    {
      comment.id &&
      <button
        id="cancel-edit"
        type="button"
        onClick={cancelEdit}
        className="btn btn-secondary"
      >
        Cancel
      </button>
    }
  </form>
);

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired
};

export default CommentForm;
