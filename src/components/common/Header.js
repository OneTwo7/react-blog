import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import { setLanguage } from '../../actions/langActions';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import NavbarMenu from './navbar/NavbarMenu';
import AccountModal from './account/AccountModal';
import ConfirmationModal from './modals/ConfirmationModal';
import * as notifications from '../../utils/notifications';
import AccountContext from './AccountContext';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: {
        email: '',
        name: '',
        password: '',
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
    this.send = this.send.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  componentDidMount () {
    this.props.actions.getCurrentUser();
    this.attachFocus();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.auth && nextProps.auth._id) {
      notifications.showSuccessMessage('You are logged in!');
    }
  }

  componentDidUpdate () {
    this.attachFocus();
  }

  attachFocus () {
    $('#account-modal').on('shown.bs.modal', this.focus);
    $('#account-modal a[data-toggle="list"]').on('shown.bs.tab', this.focus);
  }

  focus () {
    $('#account-modal form > div:first-child input').focus();
  }

  onChange (event) {
    const { name } = event.target;
    const { data } = this.state;
    data[name] = event.target.value;
    const errors = this.validate(name, data);
    this.setState({ data, errors });
  }

  onKeyDown (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const action = event.target.id.split('-')[0];
      this[action]();
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

  inputsFilled ({ email, name, password, password_confirmation }) {
    let result = true;
    if (email !== undefined && email.trim().length < 6) {
      notifications.showErrorMessage('Email should be at least 6 characters!');
      result = false;
    }
    if (name !== undefined && name.trim() === '') {
      notifications.showErrorMessage('You must provide name!');
      result = false;
    }
    if (password !== undefined && password.length < 6) {
      notifications.showErrorMessage(
        'Password should be at least 6 characters!'
      );
      result = false;
    }
    if (password_confirmation !== undefined) {
      if (password !== password_confirmation) {
        notifications.showErrorMessage('Passwords don\'t match!');
        result = false;
      }
    }
    return result;
  }

  login () {
    const { email, password } = this.state.data;
    if (this.inputsFilled({ email, password })) {
      this.props.actions.login(email.toLowerCase(), password).then(() => {
        $('#account-modal').modal('hide');
        this.setDefault();
        notifications.showSuccessMessage('You are now logged in!');
      }).catch(error => {
        notifications.showReason(error);
      });
    }
  }

  signup () {
    const { email, name, password, password_confirmation } = this.state.data;
    if (this.inputsFilled({ email, name, password, password_confirmation })) {
      const data = {
        email: email.toLowerCase(),
        name,
        password
      };
      this.props.actions.createUser(data).then(() => {
        $('#account-modal').modal('hide');
        this.setDefault();
        notifications.showSuccessMessage(
          'Account is created. Check your email for activation link!'
        );
      }).catch(error => {
        notifications.showReason(error);
      });
    }
  }

  logout () {
    this.props.actions.logout().then(() => {
      notifications.showSuccessMessage('You successfully logged out!');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  update () {
    const { name, password, password_confirmation } = this.state.data;
    const inputs = {};
    if (name) {
      inputs.name = name;
    }
    if (password) {
      inputs.password = password;
      inputs.password_confirmation = password_confirmation;
    }
    if (this.inputsFilled(inputs)) {
      const data = { name, password };
      this.props.actions.updateUser(data, this.props.auth._id).then(() => {
        $('#account-modal').modal('hide');
        this.setDefault();
        notifications.showSuccessMessage('Account successfully updated!');
      }).catch(error => {
        notifications.showReason(error);
      });
    }
  }

  remove () {
    const { email } = this.state.data;
    if (this.inputsFilled({ email })) {
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
  }

  setDefault () {
    this.setState({
      data: { email: '', password: '', name: '', password_confirmation: '' }
    });
  }

  confirm () {
    this.props.actions.deleteUser(this.props.auth._id).then(() => {
      notifications.showSuccessMessage('Account successfully removed!');
    }).catch(error => {
      notifications.showReason(error);
    });
    $('#account-confirmation-modal').modal('hide');
  }

  send (event) {
    const { email } = this.state.data;
    if (this.inputsFilled({ email })) {
      const { action } = event.target.dataset;
      let sendAction, message;
      if (action === 'resend-activation') {
        sendAction = this.props.actions.resendActivationLink;
        message = 'Check your email for activation link!';
      } else {
        sendAction = this.props.actions.sendResetLink;
        message = 'Check your email for reset link!';
      }
      sendAction(email).then(() => {
        $('#account-modal').modal('hide');
        this.setDefault();
        notifications.showSuccessMessage(message);
      }).catch(error => {
        notifications.showReason(error);
      });
    }
  }

  setLanguage (event) {
    const { lang } = event.target.dataset;
    document.title = lang === 'en' ? 'Blog' : 'Блог';
    document.documentElement.lang = lang;
    this.props.setLanguage(lang);
  }

  render () {
    const { data, errors } = this.state;
    const { auth, lang } = this.props;

    return (
      <header className="navbar navbar-expand-md navbar-dark bg-primary">
        <nav className="container">
          <div id="home-selector-container">
            <Link className="navbar-brand" to="/">Home</Link>
            <LanguageSelector lang={lang} select={this.setLanguage} />
          </div>
          <NavbarMenu auth={auth} logout={this.logout} />
          <AccountContext.Provider value={{
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            login: this.login,
            signup: this.signup,
            update: this.update,
            remove: this.remove,
            send: this.send,
            auth,
            data,
            errors
          }}>
            <AccountModal />
          </AccountContext.Provider>
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
  lang: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, lang }) => {
  return {
    auth,
    lang
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    setLanguage: bindActionCreators(setLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
