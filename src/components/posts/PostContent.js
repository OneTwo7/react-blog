import React from 'react';
import { onPaste, handleKey, addElement } from '../../utils/editorHelpers';
import { contentControls, clearControls } from './contentControls';
import PropTypes from 'prop-types';

const preview = (event) => {
  const $previewModal = $('#preview-modal');
  const inputId = event.target.id.split('-preview-')[0];
  const input = document.getElementById(inputId);
  if (input.files && input.files[0]) {
    const src = URL.createObjectURL(input.files[0]);
    $previewModal.find('.modal-body').html(`<img src="${src}">`);
    $previewModal.modal('show');
  }
};

const change = (event) => {
  const input = event.target;
  const $label = $(`label[for="${input.id}"]`);
  if (input.files && input.files[0]) {
    $label.text('File chosen');
  } else {
    $label.text('Choose file');
  }
};

const PostContent = ({ fields, moveField, addField, clear, cancel }) => {
  const renderFields = () => {
    return fields.map(({ type, id }) => {
      let field;
      if (type === 'img') {
        field = (
          <div className="input-group">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary btn-preview"
                id={`img-${id}-preview-btn`}
                type="button"
                onClick={preview}
              >
                Preview
              </button>
            </div>
            <div className="custom-file">
              <input
                className="custom-file-input"
                id={`img-${id}`}
                type="file"
                accept="image/*"
                onChange={change}
              />
              <label className="custom-file-label" htmlFor={`img-${id}`}>
                Choose file
              </label>
            </div>
          </div>
        );
      } else {
        field = (
          <pre
            className={type}
            contentEditable="true"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={type === 'text'}
          />
        );
      }
      return (
        <div key={id} id={id} className="field-wrapper">
          {field}
          <div className="field-controls">
            <button
              type="button"
              className="btn btn-outline-dark swap-up"
              onClick={moveField}
            >
              <i className="fas fa-caret-up fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-dark remove-btn"
              onClick={moveField}
            >
              <i className="fas fa-times fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-dark swap-down"
              onClick={moveField}
            >
              <i className="fas fa-caret-down fa-lg" />
            </button>
          </div>
        </div>
      );
    });
  };

  const renderControls = (controls) => (
    controls.map(({ type, id, text }, idx) => {
      let clickHandler;
      switch (type) {
        case 'addElement':
          clickHandler = addElement;
          break;
        case 'addField':
          clickHandler = addField;
          break;
        case 'clearFields':
          clickHandler = clear;
          break;
        default:
          clickHandler = cancel;
      }
      return (
        <button
          key={idx}
          type="button"
          id={id}
          onClick={clickHandler}
          className="btn btn-light"
        >
          {text}
        </button>
      );
    })
  );

  const renderContentInput = () => ([
    <div key="content" id="content" onPaste={onPaste} onKeyDown={handleKey}>
      {renderFields()}
    </div>,
    <div key="content-controls" id="content-controls">
      {renderControls(contentControls)}
    </div>,
    <div key="clear-controls" id="clear-controls">
      {renderControls(clearControls)}
    </div>
  ]);

  return (
    <div className="form-group">
      <label>Content</label>
      {renderContentInput()}
    </div>
  );
};

PostContent.propTypes = {
  fields: PropTypes.array.isRequired,
  moveField: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default PostContent;
