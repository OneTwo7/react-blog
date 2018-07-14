import React from 'react';
import Input from '../inputs/Input';
import PropTypes from 'prop-types';
import AccountContext from '../AccountContext';

const ModalPane = ({ type }) => (
  <AccountContext.Consumer>
    {context => {
      const { auth, data, onChange, onKeyDown, errors, send } = context;
      if (auth && auth._id) {
        if (type === 'social' || type === 'login' || type === 'signup') {
          return null;
        }
      } else {
        if (type === 'update' || type === 'remove') {
          return null;
        }
      }
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
          clickHandler = context.update;
          submitButtonText = 'Update';
          inputs.push(nameInput, passwordInput, confirmationInput);
        } else if (type === 'remove') {
          submitButtonClass = 'btn btn-danger';
          clickHandler = context.remove;
          submitButtonText = 'Remove Account';
          inputs.push(emailInput);
        } else if (type === 'login') {
          clickHandler = context.login;
          submitButtonText = 'Login';
          inputs.push(emailInput, passwordInput);
          resetButton = (
            <button
              type="button"
              data-action="reset-password"
              className="btn btn-dark"
              onClick={send}
            >
              Reset Password
            </button>
          );
          resendButton = (
            <button
              type="button"
              data-action="resend-activation"
              className="btn btn-dark"
              onClick={send}
            >
              Resend Activation
            </button>
          );
        } else {
          clickHandler = context.signup;
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
    }}
  </AccountContext.Consumer>
);

ModalPane.propTypes = {
  type: PropTypes.string
};

export default ModalPane;
