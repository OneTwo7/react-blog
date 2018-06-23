import React from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';

const LoginPane = ({ auth, onChange, onKeyDown, login }) => {
  return (
    <div
      className="tab-pane fade show"
      id="list-login"
      role="tabpanel"
      aria-labelledby="modal-login-list"
    >
      <div className="modal-body">
        <form>
          <Input
            id="login-email"
            type="email"
            val={auth.email}
            name="email"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Email"
          />
          <Input
            id="login-password"
            type="password"
            val={auth.password}
            name="password"
            onChange={onChange}
            onKeyDown={onKeyDown}
            label="Password"
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
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
};

LoginPane.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  auth: PropTypes.object,
  login: PropTypes.func
};

export default LoginPane;
