import React from 'react';
import Input from './Input';
import PropTypes from 'prop-types';

const LoginModal = ({ onChange, onKeyDown, auth, login, signup, errors }) => (
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
          <div className="list-group" role="tablist">
            <a
              className="list-group-item list-group-item-action active"
              id="modal-login-list"
              data-toggle="list"
              href="#list-login"
              aria-controls="login"
            >
              Login
            </a>
            <a
              className="list-group-item list-group-item-action"
              id="modal-signup-list"
              data-toggle="list"
              href="#list-signup"
              aria-controls="signup"
            >
              Sign up
            </a>
          </div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="list-login"
            role="tabpanel"
            aria-labelledby="modal-login-list"
          >
            <div className="modal-body">
              <div id="social-login">
                <a href="/auth/google" id="google-btn">
                  Login with Google
                </a>
                <a href="/auth/facebook" id="facebook-btn">
                  Login with Facebook
                </a>
                <a href="/auth/vk" id="vk-btn">
                  Login with VK
                </a>
              </div>
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
        </div>
      </div>
    </div>
  </div>
);

LoginModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginModal;
