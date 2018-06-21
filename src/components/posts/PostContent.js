import React from 'react';
import PostContentFields from './PostContentFields';
import PostContentControls from './PostContentControls';
import { addElement } from '../../utils/editorHelpers';
import { contentControls, clearControls } from './contentControls';
import PropTypes from 'prop-types';

const PostContent = (props) => {
  const handlers = {
    addElement: addElement,
    addField: props.addField,
    clearFields: props.clear,
    cancelClear: props.cancel
  };

  return (
    <div className="form-group">
      <label>Content</label>
      <PostContentFields
        fields={props.fields}
        move={props.moveField}
        pictures={props.pictures}
        preview={props.preview}
        reselect={props.reselect}
      />
      <PostContentControls
        id="content-controls"
        controls={contentControls}
        handlers={handlers}
      />
      <PostContentControls
        id="clear-controls"
        controls={clearControls}
        handlers={handlers}
      />
    </div>
  );
};

PostContent.propTypes = {
  fields: PropTypes.array.isRequired,
  moveField: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  pictures: PropTypes.array.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired
};

export default PostContent;
