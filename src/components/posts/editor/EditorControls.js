import React from 'react';
import { textControls, contentControls, btnClass } from './controls';
import { addElement } from '../../../utils/editorHelpers';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/posts/editor/editorControls';

const EditorControls = ({ lang, id, addField, clearFields, cancelClear }) => {
  const controls = id === 'text-controls' ? textControls : contentControls;
  const handlers = { addElement, addField, clearFields, cancelClear };

  return (
    <div id={id}>
      {
        controls.map(({ type, id }, idx) => (
          <button
            key={idx}
            type="button"
            id={id}
            onMouseDown={handlers[type]}
            className={btnClass[type]}
          >
            {strings[lang][id]}
          </button>
        ))
      }
    </div>
  );
};

EditorControls.propTypes = {
  lang: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  addField: PropTypes.func,
  clearFields: PropTypes.func,
  cancelClear: PropTypes.func
};

export default EditorControls;
