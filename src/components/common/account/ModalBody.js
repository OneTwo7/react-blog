import React from 'react';
import PropTypes from 'prop-types';

const PANES = ['update', 'remove', 'social', 'login', 'signup'];

const ModalBody = ({ children }) => {
  const child = React.Children.only(children);
  const elements = PANES.map(pane => (
    React.cloneElement(child, { key: pane, type: pane })
  ));

  return <div className="tab-content">{elements}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.object.isRequired
};

export default ModalBody;
