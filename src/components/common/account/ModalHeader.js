import React from 'react';
import PropTypes from 'prop-types';

const TABS = ['update', 'remove', 'social', 'login', 'signup'];

const ModalHeader = ({ children }) => {
  const child = React.Children.only(children);
  const elements = TABS.map(tab => (
    React.cloneElement(child, {
      key: tab,
      tab
    })
  ));

  return (
    <div className="modal-header">
      <div className="list-group" role="tablist">
        {elements}
      </div>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.object.isRequired
};

export default ModalHeader;
