import React from 'react';
import PropTypes from 'prop-types';

const LoginButton = ({ auth, logout }) => {
  if (!auth) {
    return null;
  }
  if (!auth._id) {
    return (
      <li className="nav-item">
        <button
          key="account-modal-btn"
          type="button"
          className="btn btn-outline-light"
          data-toggle="modal"
          data-target="#account-modal"
        >
          Login
        </button>
      </li>
    );
  } else {
    const { name, email } = auth;
    return (
      <li className="nav-item dropdown">
        <button
          key="navbarDropdown"
          className="btn btn-link dropdown-toggle"
          id="navbarDropdown"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {name}
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <button
            type="button"
            className="btn btn-link dropdown-item"
            data-toggle="modal"
            data-target={
              email ? '#account-modal' : '#account-confirmation-modal'
            }
          >
            {email ? 'Account' : 'Delete Account'}
          </button>
          <button
            type="button"
            className="btn btn-link dropdown-item"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </li>
    );
  }
};

LoginButton.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default LoginButton;
