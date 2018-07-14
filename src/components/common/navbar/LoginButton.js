import React from 'react';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/common/navbar/loginButton';

const LoginButton = ({ auth, lang, logout }) => {
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
          {strings[lang].login}
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
            {email ? strings[lang].account : strings[lang].remove}
          </button>
          <button
            type="button"
            className="btn btn-link dropdown-item"
            onClick={logout}
          >
            {strings[lang].logout}
          </button>
        </div>
      </li>
    );
  }
};

LoginButton.propTypes = {
  auth: PropTypes.object,
  lang: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginButton;
