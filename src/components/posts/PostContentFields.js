import React from 'react';
import PictureInput from './PictureInput';
import { onPaste, handleKey } from '../../utils/editorHelpers';
import PropTypes from 'prop-types';

const PostContentFields = ({ fields, move, pictures, preview, reselect }) => (
  <div id="content" onPaste={onPaste} onKeyDown={handleKey}>
    {
      fields.map(({ type, id }) => (
        <div key={id} id={id} className="field-wrapper">
          {
            type === 'img' ?
            <PictureInput
              id={id}
              pictures={pictures}
              preview={preview}
              reselect={reselect}
            /> :
            <pre
              className={type}
              contentEditable="true"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={type === 'text'}
            />
          }
          <div className="field-controls">
            <button
              type="button"
              className="btn btn-outline-dark swap-up"
              onClick={move}
            >
              <i className="fas fa-caret-up fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-dark remove-btn"
              onClick={move}
            >
              <i className="fas fa-times fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-dark swap-down"
              onClick={move}
            >
              <i className="fas fa-caret-down fa-lg" />
            </button>
          </div>
        </div>
      ))
    }
  </div>
);

PostContentFields.propTypes = {
  fields: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  pictures: PropTypes.array.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired
};

export default PostContentFields;
