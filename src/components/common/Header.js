import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import { createUser } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import * as notifications from '../../utils/notifications';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      auth: {
        email: '',
        password: '',
        name: '',
        password_confirmation: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.signup = this.signup.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount () {
    this.props.actions.getCurrentUser();
    $('#login-modal').on('shown.bs.modal', () => {
      $('input[type="email"]:first').focus();
    });
    $('#list-signup input').on('input', this.validate);
  }

  componentWillReceiveProps () {
    const { auth } = this.props;
    if (!auth) {
      notifications.showSuccessMessage('You are logged in!');
    }
  }

  onChange (event) {
    const name = event.target.name;
    const auth = this.state.auth;
    auth[name] = event.target.value;
    this.setState({ auth });
  }

  onKeyDown (event) {
    if (event.keyCode === 13) {
      if (event.target.id.includes('login')) {
        this.login();
      } else {
        this.signup();
      }
    }
  }

  validate (event) {
    this.onChange(event);
    const { name: inputName } = event.target;
    const { errors } = this.state;
    const { email, name, password, password_confirmation } = this.state.auth;
    let error;
    if (inputName === 'email') {
      error = email.length < 6;
    } else if (inputName === 'name') {
      error = !name.length;
    } else if (inputName === 'password') {
      error = password.length < 6;
    } else {
      error = password !== password_confirmation;
    }
    errors[inputName] = error;
    this.setState({ errors });
  }

  login () {
    const { email, password } = this.state.auth;
    if (!email || !password) {
      notifications.showErrorMessage('You must provide email and password!');
      return;
    }
    this.props.actions.login(email.toLowerCase(), password).then(() => {
      $('#login-modal').modal('hide');
      this.setDefault();
      notifications.showSuccessMessage('You are now logged in!');
    }).catch(error => {
      notifications.showErrorMessage('Invalid email/password combination!');
    });
  }

  signup () {
    const { email, name, password, password_confirmation } = this.state.auth;
    if (!email || !name || !password) {
      notifications.showErrorMessage('You must fill in all inputs!');
      return;
    }
    if (email.length < 6) {
      notifications.showErrorMessage('Email should be at least 6 characters!');
      return;
    }
    if (password.length < 6) {
      notifications
      .showErrorMessage('Password should be at least 6 characters!');
      return;
    }
    if (password !== password_confirmation) {
      notifications.showErrorMessage('Passwords don\'t match!');
      return;
    }

    const user = {
      email: email.toLowerCase(),
      name,
      password
    };

    this.props.createUser(user).then(() => {
      $('#login-modal').modal('hide');
      this.setDefault();
      notifications.showSuccessMessage('You have successfully signed up!');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  logout () {
    this.props.actions.logout().then(() => {
      notifications.showSuccessMessage('You successfully logged out!');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  setDefault () {
    this.setState({
      auth: { email: '', password: '', name: '', password_confirmation: '' }
    });
  }

  renderContent () {
    const { auth } = this.props;

    if (!auth) {
      return;
    } else if (!auth._id) {
      return (
        <li className="nav-item">
          <button
            key="lodin-modal-btn"
            type="button"
            className="btn btn-outline-light"
            data-toggle="modal"
            data-target="#login-modal"
          >
            Login
          </button>
        </li>
      );
    } else {
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
            {auth.name}
          </button>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <button
              key="2"
              type="button"
              className="btn btn-link dropdown-item"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
        </li>
      );
    }
  }

  render () {
    const { auth, errors } = this.state;

    return (
      <header className="navbar navbar-expand-md navbar-dark bg-primary">
        <nav className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mr-auto active">
                <Link className="nav-link" to="/new_post">
                  New Post
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {this.renderContent()}
            </ul>
          </div>


          <LoginModal
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            auth={auth}
            login={this.login}
            signup={this.signup}
            onFocus={this.onFocus}
            errors={errors}
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    createUser: bindActionCreators(createUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
