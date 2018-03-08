import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      auth: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount () {
    this.props.actions.getCurrentUser();
  }

  onChange (event) {
    const name = event.target.name;
    const auth = this.state.auth;
    auth[name] = event.target.value;
    this.setState({ auth });
  }

  onKeyDown (event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  login () {
    const { email, password } = this.state.auth;
    if (!email || !password) {
      return;
    }
    const auth = {
      email: '',
      password: ''
    };
    this.props.actions.login(email, password).then(() => {
      $('#login-modal').modal('hide');
      this.setState({ auth });
    }).catch(error => {
      return;
    });
  }

  logout () {
    this.props.actions.logout();
  }

  renderContent () {
    const { auth } = this.props;

    if (!auth) {
      return;
    } else if (!auth.id) {
      return (
        <li className="nav-item">
          <button
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
            auth={this.state.auth}
            login={this.login}
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
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
