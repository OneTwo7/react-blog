import React from 'react';
import PictureInput from './PictureInput';
import * as helpers from '../../../utils/editorHelpers';
import PropTypes from 'prop-types';

const Fields = (props) => {
  const { lang, pictures, move, preview, reselect, blur, change } = props;
  const { onPaste, handleKey, attachTextControls } = helpers;

  return (
    <div id="content" onPaste={onPaste} onKeyDown={handleKey}>
      {
        props.fields.map(({ type, id }) => (
          <div
            key={id}
            id={id}
            className="field-wrapper"
            onFocus={attachTextControls}
          >
            {
              type === 'img' ?
              <PictureInput
                id={id}
                lang={lang}
                pictures={pictures}
                preview={preview}
                reselect={reselect}
                blur={blur}
                change={change}
              /> :
              <pre
                className={type}
                contentEditable="true"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={type === 'text'}
                onBlur={blur}
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
};

Fields.propTypes = {
  lang: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  pictures: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

export default Fields;
