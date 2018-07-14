import React from 'react';
import TextareaInput from '../common/inputs/TextareaInput';
import PropTypes from 'prop-types';
import strings from '../../strings/components/comments/commentForm';

const CommentForm = (props) => {
  const { auth, lang, comment, errors, change, click, cancel } = props;
  return (
    <form id="comment-form">
      <TextareaInput
        name="content"
        value={comment.content}
        onChange={change}
        error={errors.content}
        placeholder={strings[lang].placeholder}
      />
      {
        !(auth && auth._id) &&
        <button
          type="button"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#account-modal"
        >
          {strings[lang].login}
        </button>
      }
      {
        auth && auth._id &&
        <input
          type="submit"
          value={strings[lang].submit}
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
          {strings[lang].cancel}
        </button>
      }
    </form>
  );
};

CommentForm.propTypes = {
  auth: PropTypes.object,
  lang: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default CommentForm;
