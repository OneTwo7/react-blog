import React from 'react';
import PropTypes from 'prop-types';

const PictureInput = ({ id, pictures, preview, reselect, blur, change }) => {
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
          Change
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
          onChange={change}
        />
        <label className="custom-file-label" htmlFor={`img-${id}`}>
          Choose file
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
            Preview
          </button>
        </div>
        {pictureFile}
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={`img-${id}-sign`}>
            Sign
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
  pictures: PropTypes.array.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

export default PictureInput;
