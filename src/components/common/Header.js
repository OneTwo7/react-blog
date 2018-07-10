import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import { Link } from 'react-router-dom';
import AccountModal from './account/AccountModal';
import ConfirmationModal from './modals/ConfirmationModal';
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
    this.onKeyDown = this.onKeyDown.bind(this);
    this.signup = this.signup.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.validate = this.validate.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount () {
    this.props.actions.getCurrentUser();
    this.attachFocus();
  }

  componentWillReceiveProps (nextProps) {
    const { auth } = this.props;
    const { auth: nextAuth } = nextProps;
    if (!auth && nextAuth._id) {
      notifications.showSuccessMessage('You are logged in!');
    }
  }

  componentDidUpdate () {
    this.attachFocus();
  }

  attachFocus () {
    const focus = () => {
      $('#account-modal form > div:first-child input').focus();
    };
    $('#account-modal').on('shown.bs.modal', focus);
    $('#account-modal a[data-toggle="list"]').on('shown.bs.tab', focus);
  }

  onChange (event) {
    const name = event.target.name;
    const auth = this.state.auth;
    auth[name] = event.target.value;
    const errors = this.validate(name, auth);
    this.setState({ auth, errors });
  }

  onKeyDown (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const { id } = event.target;
      if (id.includes('login')) {
        this.login();
      } else if (id.includes('modify')) {
        this.update();
      } else if (id.includes('delete')) {
        this.remove();
      } else {
        this.signup();
      }
    }
  }

  validate (input, { email, name, password, password_confirmation }) {
    const { errors } = this.state;
    let error;
    if (input === 'email') {
      error = email.length < 6;
    } else if (input === 'name') {
      error = !name.length;
    } else if (input === 'password') {
      error = password.length < 6;
    } else {
      error = password !== password_confirmation;
    }
    errors[input] = error;
    return errors;
  }

  login () {
    const { email, password } = this.state.auth;
    if (!email || !password) {
      notifications.showErrorMessage('You must provide email and password!');
      return;
    }
    this.props.actions.login(email.toLowerCase(), password).then(() => {
      $('#account-modal').modal('hide');
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

    this.props.actions.createUser(user).then(() => {
      $('#account-modal').modal('hide');
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

  update () {
    const { name, password, password_confirmation } = this.state.auth;
    if (!name) {
      notifications.showErrorMessage('You must provide name!');
      return;
    }
    if (password && password.length < 6) {
      notifications
      .showErrorMessage('Password should be at least 6 characters long!');
      return;
    }
    if (password && password !== password_confirmation) {
      notifications.showErrorMessage('Passwords don\'t match!');
      return;
    }

    const data = { name, password };

    this.props.actions.updateUser(data, this.props.auth._id).then(() => {
      $('#account-modal').modal('hide');
      this.setDefault();
      notifications.showSuccessMessage('Account successfully updated!');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  remove () {
    const { email } = this.state.auth;
    if (email.length < 6) {
      notifications.showErrorMessage('You must input email!');
      return;
    }

    const { _id, email: requiredEmail } = this.props.auth;
    if (email !== requiredEmail) {
      notifications.showErrorMessage('Wrong email!');
      return;
    }

    this.props.actions.deleteUser(_id).then(() => {
      $('#account-modal').modal('hide');
      this.setDefault();
      notifications.showSuccessMessage('Account successfully removed!');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  setDefault () {
    this.setState({
      auth: { email: '', password: '', name: '', password_confirmation: '' }
    });
  }

  confirm () {
    this.props.actions.deleteUser(this.state.auth._id).then(() => {
      notifications.showSuccessMessage('Account successfully removed!');
    }).catch(error => {
      notifications.showReason(error);
    });
    $('#account-confirmation-modal').modal('hide');
  }

  renderLoginButton (auth) {
    if (!auth) {
      return;
    } else if (!auth._id) {
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
              data-target={email ? '#account-modal' : '#account-confirmation-modal'}
            >
              {email ? 'Account' : 'Delete Account'}
            </button>
            <button
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

  renderNewPostButton (auth) {
    if (auth && auth._id) {
      return (
        <li className="nav-item active">
          <Link className="nav-link" to="/new_post">
            New Post
          </Link>
        </li>
      );
    }
    return null;
  }

  render () {
    const { auth, errors } = this.state;
    const { auth: user } = this.props;

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
              {this.renderNewPostButton(user)}
            </ul>
            <ul className="navbar-nav">
              {this.renderLoginButton(user)}
            </ul>
          </div>


          <AccountModal
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            auth={auth}
            login={this.login}
            signup={this.signup}
            errors={errors}
            update={this.update}
            remove={this.remove}
            user={user}
          />
        </nav>
        <ConfirmationModal
          id="account-confirmation-modal"
          confirm={this.confirm}
          message="Are you sure you want to delete your account?"
        />
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, ajaxCallsInProgress }) => {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
