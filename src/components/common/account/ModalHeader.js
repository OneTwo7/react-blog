import React from 'react';
import PropTypes from 'prop-types';

const tabs = ['social', 'login', 'signup'];

const ModalHeader = (props) => {
  const { auth } = props;
  const child = React.Children.only(props.children);
  const children = [];

  if (auth && auth._id) {
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
        text: idx === 1 ? 'Email' : tab[0].toUpperCase() + tab.slice(1),
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
  auth: PropTypes.object
};

export default ModalHeader;
