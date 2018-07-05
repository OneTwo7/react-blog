import React from 'react';
import { textControls, contentControls, btnClass } from './controls';
import { addElement } from '../../../utils/editorHelpers';
import PropTypes from 'prop-types';

const EditorControls = ({ id, addField, clearFields, cancelClear }) => {
  const controls = id === 'text-controls' ? textControls : contentControls;
  const handlers = { addElement, addField, clearFields, cancelClear };

  return (
    <div id={id}>
      {
        controls.map(({ type, id, text }, idx) => (
          <button
            key={idx}
            type="button"
            id={id}
            onMouseDown={handlers[type]}
            className={btnClass[type]}
          >
            {text}
          </button>
        ))
      }
    </div>
  );
};

EditorControls.propTypes = {
  id: PropTypes.string.isRequired,
  addField: PropTypes.func,
  clearFields: PropTypes.func,
  cancelClear: PropTypes.func
};

export default EditorControls;
