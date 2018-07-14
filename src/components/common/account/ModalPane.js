import React from 'react';
import Input from '../inputs/Input';
import PropTypes from 'prop-types';
import AccountContext from '../AccountContext';
import strings from '../../../strings/components/common/account/modalPane';

const ModalPane = ({ type }) => (
  <AccountContext.Consumer>
    {context => {
      const { auth, lang, data, onChange, onKeyDown, errors, send } = context;
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
            <a href="/auth/google" id="google-btn">{strings[lang].google}</a>
            <a href="/auth/github" id="github-btn">{strings[lang].github}</a>
            <a href="/auth/vk" id="vk-btn">{strings[lang].vk}</a>
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
            label={strings[lang].email}
            error={errors && errors.email}
          />
        );
        const nameInput = (
          <Input
            key="name"
            id={`${type}-name`}
            type="text"
            val={data && data.name}
            name="name"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label={strings[lang].name}
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
            label={strings[lang].password}
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
            label={strings[lang].password_confirmation}
            error={errors && errors.password_confirmation}
          />
        );
        if (type === 'update') {
          paneClass += ' show active';
          clickHandler = context.update;
          submitButtonText = strings[lang].update;
          inputs.push(nameInput, passwordInput, confirmationInput);
        } else if (type === 'remove') {
          submitButtonClass = 'btn btn-danger';
          clickHandler = context.remove;
          submitButtonText = strings[lang].remove;
          inputs.push(emailInput);
        } else if (type === 'login') {
          clickHandler = context.login;
          submitButtonText = strings[lang].login;
          inputs.push(emailInput, passwordInput);
          resetButton = (
            <button
              type="button"
              data-action="reset-password"
              className="btn btn-dark"
              onClick={send}
            >
              {strings[lang].reset}
            </button>
          );
          resendButton = (
            <button
              type="button"
              data-action="resend-activation"
              className="btn btn-dark"
              onClick={send}
            >
              {strings[lang].resend}
            </button>
          );
        } else {
          clickHandler = context.signup;
          submitButtonText = strings[lang].signup;
          inputs.push(emailInput, nameInput, passwordInput, confirmationInput);
        }
        if (type === 'remove') {
          modalBody = (
            <React.Fragment>
              <div id="remove-notice">{strings[lang].removeNotice}</div>
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
              {strings[lang].close}
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
