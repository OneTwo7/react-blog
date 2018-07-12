import React from 'react';
import PropTypes from 'prop-types';

const AccountModalContainer = (props) => {
  const children = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return React.cloneElement(child, { user: props.user });
    } else {
      const newProps = Object.assign({}, props);
      delete newProps.children;
      return React.cloneElement(child, newProps);
    }
  });

  return (
    <div
      className="modal fade"
      id="account-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="AccountModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

AccountModalContainer.propTypes = {
  children: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default AccountModalContainer;
