import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, name, label, type, onChange, onKeyDown, val, error }) => {
  let inputClass = 'form-control';
  if (error) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="form-group">
      <input
        id={id}
        placeholder={label}
        type={type}
        name={name}
        className={inputClass}
        value={val}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  val: PropTypes.string,
  error: PropTypes.bool
};

export default Input;
