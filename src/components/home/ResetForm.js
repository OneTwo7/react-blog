import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import Input from '../common/inputs/Input';
import PropTypes from 'prop-types';
import * as notifications from '../../utils/notifications';

class ResetForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: {
        password: '',
        password_confirmation: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
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
      this.resetPassword();
    }
  }

  validate (input, { password, password_confirmation }) {
    const { errors } = this.state;
    let error;
    if (input === 'password') {
      error = password.length < 6;
    } else {
      error = password !== password_confirmation;
    }
    errors[input] = error;
    return errors;
  }

  resetPassword () {
    const { auth } = this.props;
    const { password, password_confirmation } = this.state.data;

    if (!(auth && auth._id)) {
      notifications.showErrorMessage('Your are not authenticated!');
      return;
    }

    if (password.trim().length < 6) {
      notifications.showErrorMessage('Password is too short!');
      return;
    }

    if (password !== password_confirmation) {
      notifications.showErrorMessage('Passwords don\'t match!');
      return;
    }

    this.props.updateUser({ password }, auth._id).then(() => {
      notifications.showSuccessMessage('Password successfully updated!');
      this.props.history.push('/');
    }).catch(error => {
      notifications.showReason(error);
    });
  }

  render () {
    const { data: { password, password_confirmation }, errors } = this.state;
    const { onChange, onKeyDown } = this;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form id="password-reset-form">
            <Input
              id="reset-password"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              onKeyDown={onKeyDown}
              error={errors.password}
            />
            <Input
              id="reset-password_confirmation"
              label="Password Confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={onChange}
              onKeyDown={onKeyDown}
              error={errors.password_confirmation}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.resetPassword}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ResetForm.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { updateUser })(ResetForm);
