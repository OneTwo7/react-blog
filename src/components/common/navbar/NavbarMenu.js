import React from 'react';
import NewPostButton from './NewPostButton';
import LoginButton from './LoginButton';
import PropTypes from 'prop-types';

const NavbarMenu = (props) => (
  <React.Fragment>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-menu"
      aria-controls="navbarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbar-menu">
      <ul className="navbar-nav mr-auto">
        <NewPostButton auth={props.auth} lang={props.lang} />
      </ul>
      <ul className="navbar-nav">
        <LoginButton {...props} />
      </ul>
    </div>
  </React.Fragment>
);

NavbarMenu.propTypes = {
  auth: PropTypes.object,
  lang: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default NavbarMenu;
