import React from 'react';
import Input from '../inputs/Input';
import PropTypes from 'prop-types';

const ModalPane = (props) => {
  const { type, data, onChange, onKeyDown, errors } = props;
  let modalBody;
  let paneClass = 'tab-pane fade';
  let submitButton = null;
  let resetButton = null;
  let resendButton = null;

  if (type === 'social') {
    paneClass += ' show active';
    modalBody = (
      <div id="social-login">
        <a href="/auth/google" id="google-btn">
          Log in with Google
        </a>
        <a href="/auth/github" id="github-btn">
          Log in with Github
        </a>
        <a href="/auth/vk" id="vk-btn">
          Log in with VK
        </a>
      </div>
    );
  } else {
    let submitButtonClass = 'btn btn-primary';
    let clickHandler;
    let submitButtonText;
    const inputs = [];
    const emailInput = (
      <Input
        key="email"
        id={`${type}-email`}
        type="email"
        val={data && data.email}
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
        id={`${type}-name`}
        type="text"
        val={data && data.name}
        label="Name"
        name="name"
        onChange={onChange}
        onKeyDown={onKeyDown}
        error={errors && errors.name}
      />
    );
    const passwordInput = (
      <Input
        key="password"
        id={`${type}-password`}
        type="password"
        val={data && data.password}
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
        id={`${type}-password_confirmation`}
        type="password"
        val={data && data.password_confirmation}
        name="password_confirmation"
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="Password Confirmation"
        error={errors && errors.password_confirmation}
      />
    );
    if (type === 'update') {
      paneClass += ' show active';
      clickHandler = props.update;
      submitButtonText = 'Update';
      inputs.push(nameInput, passwordInput, confirmationInput);
    } else if (type === 'remove') {
      submitButtonClass = 'btn btn-danger';
      clickHandler = props.remove;
      submitButtonText = 'Remove Account';
      inputs.push(emailInput);
    } else if (type === 'login') {
      clickHandler = props.login;
      submitButtonText = 'Login';
      inputs.push(emailInput, passwordInput);
      resetButton = (
        <button
          type="button"
          data-action="reset-password"
          className="btn btn-dark"
          onClick={props.send}
        >
          Reset Password
        </button>
      );
      resendButton = (
        <button
          type="button"
          data-action="resend-activation"
          className="btn btn-dark"
          onClick={props.send}
        >
          Resend Activation
        </button>
      );
    } else {
      clickHandler = props.signup;
      submitButtonText = 'Sign Up';
      inputs.push(emailInput, nameInput, passwordInput, confirmationInput);
    }
    if (type === 'remove') {
      modalBody = (
        <React.Fragment>
          <div id="repeat-notice">Input your email to confirm:</div>
          <form>{inputs}</form>
        </React.Fragment>
      );
    } else {
      modalBody = <form>{inputs}</form>;
    }
    submitButton = (
      <button
        type="button"
        className={submitButtonClass}
        onClick={clickHandler}
      >
        {submitButtonText}
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
        {resetButton}
        {resendButton}
        {submitButton}
      </div>
    </div>
  );
};

ModalPane.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  data: PropTypes.object,
  signup: PropTypes.func,
  login: PropTypes.func,
  errors: PropTypes.object,
  update: PropTypes.func,
  remove: PropTypes.func,
  send: PropTypes.func
};

export default ModalPane;
