import React from 'react';
import * as editorHelpers from '../../utils/editorHelpers';
import { contentControls, clearControls } from './contentControls';
import PropTypes from 'prop-types';

const PostContent = (props) => {
  const { fields, moveField, addField, clear, cancel, edit, preview } = props;
  const { onPaste, handleKey, addElement, change, reselect } = editorHelpers;

  const renderFields = () => {
    return fields.map(({ type, id }) => {
      let field;
      if (type === 'img') {
        let appendClass = 'input-group-append';
        let fileInputClass = 'custom-file';
        let previewClass = 'btn btn-outline-secondary btn-preview';
        if (edit) {
          fileInputClass += ' d-none';
          previewClass += ' preview-edit';
        } else {
          appendClass += ' d-none';
        }
        field = [
          <div key="picture-file" className="input-group">
            <div className="input-group-prepend">
              <button
                className={previewClass}
                id={`img-${id}-preview-btn`}
                type="button"
                onClick={preview}
              >
                Preview
              </button>
            </div>
            <div className={appendClass}>
              <button
                className="btn btn-outline-secondary btn-change"
                id={`${id}-change-btn`}
                type="button"
                onClick={reselect}
              >
                Change
              </button>
            </div>
            <div className={fileInputClass}>
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
          </div>,
          <div key="picture-sign" className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor={`img-${id}-sign`}>
                Sign
              </label>
            </div>
            <input
              className="form-control"
              id={`img-${id}-sign`}
              type="text"
            />
          </div>
        ];
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
  cancel: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  preview: PropTypes.func.isRequired
};

export default PostContent;
