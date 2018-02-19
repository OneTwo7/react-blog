import React from 'react';
import PropTypes from 'prop-types';

const LoginModal = ({ onChange, login }) => (
  <div
    className="modal fade"
    id="login-modal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title" id="loginModalLabel">Login</h3>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                onChange={onChange}
              />
            </div>
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
    </div>
  </div>
);

LoginModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default LoginModal;
