import React from 'react';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/posts/editor/pictureInput';

const PictureInput = (props) => {
  const { id, lang, pictures, reselect, change, preview, blur } = props;
  let pictureFile;

  if (pictures.includes(id)) {
    pictureFile = (
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary btn-change"
          id={`${id}-change-btn`}
          type="button"
          onClick={reselect}
        >
          {strings[lang].change}
        </button>
      </div>
    );
  } else {
    pictureFile = (
      <div className="custom-file">
        <input
          className="custom-file-input"
          id={`img-${id}`}
          type="file"
          accept="image/*"
          lang={lang}
          onChange={change}
        />
        <label className="custom-file-label" htmlFor={`img-${id}`}>
          {strings[lang].choose}
        </label>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-secondary btn-preview"
            id={`img-${id}-preview-btn`}
            type="button"
            onClick={preview}
          >
            {strings[lang].preview}
          </button>
        </div>
        {pictureFile}
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={`img-${id}-sign`}>
            {strings[lang].sign}
          </label>
        </div>
        <input
          className="form-control"
          id={`img-${id}-sign`}
          type="text"
          onBlur={blur}
        />
      </div>
    </React.Fragment>
  );
};

PictureInput.propTypes = {
  id: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  pictures: PropTypes.array.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

export default PictureInput;
