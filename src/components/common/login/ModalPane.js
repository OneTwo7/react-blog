import React from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';

const ModalPane = (props) => {
  const { type, auth, onChange, onKeyDown, signup, login, errors } = props;
  let modalBody;
  let paneClass = 'tab-pane fade';
  let submitButton = null;

  if (type === 'social') {
    paneClass += ' show active';
    modalBody = (
      <div id="social-login">
        <a href="/auth/google" id="google-btn">
          Sign in with Google
        </a>
        <a href="/auth/github" id="github-btn">
          Sign in with Github
        </a>
        <a href="/auth/vk" id="vk-btn">
          Sign in with VK
        </a>
      </div>
    );
  } else {
    const inputs = [];
    const emailInput = (
      <Input
        key="email"
        id={`${type}-email`}
        type="email"
        val={auth && auth.email}
        name="email"
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="Email"
        error={errors && errors.email}
      />
    );
    const nameInput = (
      <Input
        key="name"
        id="signup-name"
        type="text"
        val={auth && auth.name}
        name="name"
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="Name"
        error={errors && errors.name}
      />
    );
    const passwordInput = (
      <Input
        key="password"
        id={`${type}-password`}
        type="password"
        val={auth && auth.password}
        name="password"
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="Password"
        error={errors && errors.password}
      />
    );
    const confirmationInput = (
      <Input
        key="password_confirmation"
        id="signup-password_confirmation"
        type="password"
        val={auth && auth.password_confirmation}
        name="password_confirmation"
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="Password Confirmation"
        error={errors && errors.password_confirmation}
      />
    );
    if (type === 'login') {
      inputs.push(emailInput, passwordInput);
    } else {
      inputs.push(emailInput, nameInput, passwordInput, confirmationInput);
    }
    modalBody = <form>{inputs}</form>;
    submitButton = (
      <button
        type="button"
        className="btn btn-primary"
        onClick={type === 'login' ? login : signup}
      >
        {type === 'login' ? 'Login' : 'Sign Up'}
      </button>
    );
  }

  return (
    <div
      className={paneClass}
      id={`list-${type}`}
      role="tabpanel"
      aria-labelledby={`modal-${type}-list`}
    >
      <div className="modal-body">
        {modalBody}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        {submitButton}
      </div>
    </div>
  );
};

ModalPane.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  auth: PropTypes.object,
  signup: PropTypes.func,
  login: PropTypes.func,
  errors: PropTypes.object
};

export default ModalPane;
