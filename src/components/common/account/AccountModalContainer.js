import React from 'react';
import PropTypes from 'prop-types';

const AccountModalContainer = ({ children }) => {
  const elements = React.Children.map(children, (child) => {
    return React.cloneElement(child);
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
          {elements}
        </div>
      </div>
    </div>
  );
};

AccountModalContainer.propTypes = {
  children: PropTypes.array.isRequired
};

export default AccountModalContainer;
