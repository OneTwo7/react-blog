import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import { NavLink } from 'react-router-dom';
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

  login () {
    const { email, password } = this.state.auth;
    if (!email || !password) {
      return;
    }
    const auth = {
      email: '',
      password: ''
    };
    $('#login-modal').modal('hide');
    this.setState({ auth });
    this.props.actions.login(email, password);
  }

  logout () {
    this.props.actions.logout();
  }

  renderContent () {
    if (this.props.auth) {
      return (
        <button
          type="button"
          className="btn btn-link login-btn"
          onClick={this.logout}
        >
          Logout
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-link login-btn"
          data-toggle="modal"
          data-target="#login-modal"
        >
          Login
        </button>
      );
    }
  }

  render () {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        {" | "}
        <NavLink to="/new_post">New Post</NavLink>
        {" | "}
        {this.renderContent()}

        <LoginModal onChange={this.onChange} login={this.login} />
      </nav>
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
