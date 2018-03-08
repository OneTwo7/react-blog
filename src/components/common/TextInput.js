import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, label, onChange, value, error }) => {
  let inputClass = 'form-control';
  if (error && error.length > 0) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          id={name}
          type="text"
          name={name}
          className={inputClass}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
