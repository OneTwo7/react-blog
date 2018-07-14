import React from 'react';
import TextareaInput from '../common/inputs/TextareaInput';
import PropTypes from 'prop-types';

const CommentForm = ({ auth, comment, errors, change, click, cancel }) => (
  <form id="comment-form">
    <TextareaInput
      name="content"
      value={comment.content}
      onChange={change}
      error={errors.content}
      placeholder="Write a response..."
    />
    {
      !(auth && auth._id) &&
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#account-modal"
      >
        Login
      </button>
    }
    {
      auth && auth._id &&
      <input
        type="submit"
        value="Submit"
        onClick={click}
        className="btn btn-primary"
      />
    }
    {
      comment._id &&
      <button
        id="cancel-edit"
        type="button"
        onClick={cancel}
        className="btn btn-secondary"
      >
        Cancel
      </button>
    }
  </form>
);

CommentForm.propTypes = {
  auth: PropTypes.object,
  comment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default CommentForm;
