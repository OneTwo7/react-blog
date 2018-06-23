import React from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';

const SignupPane = ({ auth, onChange, onKeyDown, signup, errors }) => {
  return (
    <div
      className="tab-pane fade"
      id="list-signup"
      role="tabpanel"
      aria-labelledby="modal-signup-list"
    >
      <div className="modal-body">
        <form>
          <Input
            id="signup-email"
            type="email"
            val={auth.email}
            name="email"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Email"
            error={errors.email}
          />
          <Input
            id="signup-name"
            type="text"
            val={auth.name}
            name="name"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Name"
            error={errors.name}
          />
          <Input
            id="signup-password"
            type="password"
            val={auth.password}
            name="password"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Password"
            error={errors.password}
          />
          <Input
            id="signup-password_confirmation"
            type="password"
            val={auth.password_confirmation}
            name="password_confirmation"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Password Confirmation"
            error={errors.password_confirmation}
          />
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={signup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

SignupPane.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  auth: PropTypes.object,
  signup: PropTypes.func,
  errors: PropTypes.object
};

export default SignupPane;
