import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, label, onChange, onKeyDown, value, error }) => {
  let inputClass = 'form-control';
  if (error && error.length > 0) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        name={name}
        className={inputClass}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
