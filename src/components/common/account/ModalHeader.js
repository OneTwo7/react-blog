import React from 'react';
import PropTypes from 'prop-types';

const tabs = ['social', 'login', 'signup'];

const ModalHeader = (props) => {
  const { user } = props;
  const child = React.Children.only(props.children);
  const children = [];

  if (user && user._id) {
    children.push(React.cloneElement(child, {
      key: 'modify',
      active: ' active',
      text: 'Modify',
      tab: 'modify'
    }));
    children.push(React.cloneElement(child, {
      key: 'delete',
      active: '',
      text: 'Delete',
      tab: 'delete'
    }));
  } else {
    tabs.forEach((tab, idx) => {
      children.push(React.cloneElement(child, {
        key: idx,
        active: idx === 0 ? ' active' : '',
        text: tab[0].toUpperCase() + tab.slice(1),
        tab
      }));
    });
  }

  return (
    <div className="modal-header">
      <div className="list-group" role="tablist">
        {children}
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
  children: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default ModalHeader;
