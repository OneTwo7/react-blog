import React from 'react';
import { onPaste, handleKey, addElement } from '../../utils/editorHelpers';
import controls from './contentControls';
import PropTypes from 'prop-types';

const PostContent = ({ label, fields, moveField, addField, clearFields }) => {
  const renderFields = () => {
    return fields.map(({ type, id }) => {
      const className = type;
      const spellCheck = type === 'text';
      return (
        <div key={id} id={id} className="field-wrapper">
          <pre
            className={className}
            contentEditable="true"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={spellCheck}
          />
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

  const renderControls = () => (
    controls.map(({ type, id, text }, idx) => {
      let clickHandler;
      switch (type) {
        case 'addElement':
          clickHandler = addElement;
          break;
        case 'addField':
          clickHandler = addField;
          break;
        default:
          clickHandler = clearFields;
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
      {renderControls()}
    </div>
  ]);

  return (
    <div className="form-group">
      <label>{label}</label>
      {renderContentInput()}
    </div>
  );
};

PostContent.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.array.isRequired,
  moveField: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired
};

export default PostContent;
