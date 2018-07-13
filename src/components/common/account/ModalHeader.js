import React from 'react';
import PropTypes from 'prop-types';

const TABS = [
  { tab: 'update', text: 'Modify' },
  { tab: 'remove', text: 'delete' },
  { tab: 'social', text: 'Social' },
  { tab: 'login',  text: 'Email' },
  { tab: 'signup', text: 'Signup' }
];

const ModalHeader = ({ children }) => {
  const child = React.Children.only(children);
  const elements = TABS.map(({ tab, text }) => (
    React.cloneElement(child, {
      key: tab,
      text,
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
