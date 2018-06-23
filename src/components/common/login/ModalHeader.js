import React from 'react';
import PropTypes from 'prop-types';

const tabs = ['social', 'login', 'signup'];

const ModalHeader = (props) => {
  const children = React.Children.map(props.children, (child, idx) => {
    const tab = tabs[idx];
    return React.cloneElement(child, {
      active: idx === 0 ? ' active' : '',
      text: tab[0].toUpperCase() + tab.slice(1),
      tab
    });
  });

  return (
    <div className="modal-header">
      <div className="list-group" role="tablist">{children}</div>
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
  children: PropTypes.array.isRequired
};

export default ModalHeader;
