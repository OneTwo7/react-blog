import React from 'react';
import PropTypes from 'prop-types';

const LoginModalContainer = (props) => {
  const { onChange, onKeyDown, auth, login, signup, errors } = props;
  const children = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return React.cloneElement(child);
    } else {
      return React.cloneElement(child, {
        onChange,
        onKeyDown,
        auth,
        login,
        signup,
        errors
      });
    }
  });

  return (
    <div
      className="modal fade"
      id="login-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

LoginModalContainer.propTypes = {
  children: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginModalContainer;
